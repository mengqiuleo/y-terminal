<template>
  <div
    class="yi-terminal-wrapper"
    :style="wrapperStyle"
    @click="handleClickWrapper"
  >
    <!-- 上面的handleClickWrapper是文本聚焦，不是换壁纸 -->
    <!-- 这个大的div就是把输出，输入，提示全都包进来了 -->
    <div ref="terminalRef" class="yi-terminal" :style="mainStyle">
      <!-- 可折叠：是输出框 -->
      <!-- activeKeys: 是否展开； 折叠图标放在右边-->
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 折叠 -->
          <a-collapse-panel
            v-if="output.collapsible"
            :key="index"
            class="terminal-row"
          >
            <!-- 这个header就是[local]$ + 你以前输入的某个命令，因为我们需要回显所有以前输入和输出的东西 -->
            <template #header>
              <!-- prompt 是 [local]$ -->
              <span style="user-select: none; margin-right: 10px">
                {{ prompt }}
              </span>
              <!-- output.text就是一条历史命令，比如history,hot,clear -->
              <span>{{ output.text }}</span>
            </template>
            <!-- 下面是对某条历史命令的返回结果列表进行输出，注意是某条命令 -->
            <div
              v-for="(result, idx) in output.resultList"
              :key="idx"
              class="terminal-row"
            >
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令及结果-->
            <!-- 这里的第一个div就相当于上面的#header模板，而这里的template就是上面的a-collapse-panel标签 -->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{
                  prompt
                }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div
                v-for="(result, idx) in output?.resultList"
                :key="idx"
                class="terminal-row"
              >
                <content-output :output="result" />
              </div>
            </template>
            <!-- 打印信息 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <!-- 输入框 -->
      <div class="terminal-row">
        <a-input
          ref="commandInputRef"
          v-model:value="inputCommand.text"
          :disabled="isRunning"
          class="command-input"
          :placeholder="inputCommand.placeholder"
          :bordered="false"
          autofocus
          @press-enter="doSubmitCommand"
        >
          <!-- 这个template用来展示 [local]$ ,去掉后就没有了, prompt的值就是[local]$ -->
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <!-- 输入提示-->
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">
        hint: {{ hint }}
      </div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, StyleValue, toRefs, watchEffect } from 'vue'

import CommandOutputType = YiTerminal.CommandOutputType //记录我们已经输入的命令类型，要不然我们怎么获取历史命令呢
import OutputType = YiTerminal.OutputType //输出类型
import CommandInputType = YiTerminal.CommandInputType //命令输入类型
import { registerShortcuts } from './shortcuts' //快捷键
import TerminalType = YiTerminal.TerminalType //终端类型
import TextOutputType = YiTerminal.TextOutputType //文本类型输出
import useHistory from './history'
import OutputStatusType = YiTerminal.OutputStatusType //输出状态
import { useTerminalConfigStore } from '../../core/commands/terminal/config/terminalConfigStore' //终端配置状态存储
import { LOCAL_USER } from './userConstant' //本地用户
import useHint from './hint' //命令提示
import UserType = User.UserType

interface YiTerminalProps {
  height?: string | number
  fullScreen?: boolean
  user?: UserType
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void
}

const props = withDefaults(defineProps<YiTerminalProps>(), {
  height: '400px',
  fullScreen: false,
  user: LOCAL_USER as any
  // 用户弄成本地用户
})

//此时这个用户不仅有自己的相关信息(只不是因为我只设置了local用户，无法注册用户)，
// 还有背景的相关信息
const { user } = toRefs(props)

const terminalRef = ref() //代表整个终端的ref
const activeKeys = ref<number[]>([]) //是否折叠
// 输出列表,是我们要进行遍历输出的列表
const outputList = ref<OutputType[]>([])
// 命令列表：记录已输入的命令，要不然我们怎么获取历史命令呢
const commandList = ref<CommandOutputType[]>([])
const commandInputRef = ref() //输入框的ref

// 命令是否运行
// 根据命令是否运行来判断提示框要不要显示，还有就是控制不要让用户在命令执行时再次执行操作
const isRunning = ref(false)

// 引入终端配置状态
const configStore = useTerminalConfigStore()

/**
 * 初始命令：就是我们输入框的初始化内容
 * 为什么要初始命令？我们要进行双向数据绑定，所以最开始的时候需要一个初始值
 */
const initCommand: CommandInputType = {
  text: '',
  placeholder: '请输入命令'
}

/**
 * 待输入的命令
 * 双向数据绑定的，就是我们输入的命令
 * 也就是说，我们输入啥，inputCommand里面就是啥
 * 因为我们双向数据绑定的值是initCommand的值，所以我们给它包装一下类型，
 * 将它变成代输入的命令inputCommand
 * 这里之所以里面有initCommand，是因为：initCommand是我们的初始的内容，可能有可能没有，所以我们保险还是拿到值吧
 */
const inputCommand = ref<CommandInputType>({
  ...initCommand
})

// 这里是测试我们输入的内容是否可以被监听到，text的值就是我们输入的东西 inputCommand.value.text
// console.log(inputCommand.value)

/**
 * 全局记录当前命令，便于写入结果
 * 这个只是一个变量而已,就相当于temp变量，只是暂时存储
 */
let currentNewCommand: CommandOutputType

const {
  commandHistoryPos, //当前命令的位置
  showPrevCommand,
  showNextCommand,
  listCommandHistory //历史命令列表
} = useHistory(commandList.value, inputCommand) //commandList首次为空

const { hint, setHint, debounceSetHint } = useHint()

// 下面全都是相关方法！！！

/**
 * 提交命令（回车）
 * 当我们按下enter键时会触发
 */
const doSubmitCommand = async () => {
  isRunning.value = true
  // 既然在执行命令，那就不要在输出命令提示了，所以输入空字符串，setHint函数输出的就是命令提示
  setHint('') //setHint方法是从useHint()中取出来的，即从./hint.ts文件中取出
  let inputText = inputCommand.value.text //拿到命令输入的内容
  // 使用！执行某条历史命令（这里是一个小的功能）
  if (inputText.startsWith('!')) {
    const commandIndex = Number(inputText.substring(1)) //命令序号
    const command = commandList.value[commandIndex - 1] //根据命令序号，算出命令
    if (command) {
      inputText = command.text
    }
  }
  // 执行命令，将输入的字符串变成命令的类型
  // 因为我们的命令都是定义了类型的,总不能把输入的字符串当成一个命令吧,所以首先要把它包装成一个命令类型
  const newCommand: CommandOutputType = {
    text: inputText,
    type: 'command',
    resultList: []
  }
  // 记录当前命令，便于写入结果
  currentNewCommand = newCommand
  // 执行命令
  await props.onSubmitCommand?.(inputText)
  // 添加输出（为空也要输出换行）
  outputList.value.push(newCommand)
  // 不为空字符串才算是有效命令
  if (inputText) {
    // 把当前命令推入历史命令中
    commandList.value.push(newCommand)
    // 重置当前要查看的命令位置
    commandHistoryPos.value = commandList.value.length
  }
  inputCommand.value = { ...initCommand }
  // 默认展开折叠面板
  activeKeys.value.push(outputList.value.length - 1)
  // 自动滚到底部
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }, 50)
  isRunning.value = false
}

/**
 * 输入框内容改变时，触发输入提示
 * 这个watch函数是vue自带的，就是用来监听
 */
watchEffect(() => {
  debounceSetHint(inputCommand.value.text)
})

/**
 * 输入提示符
 * 这里就是你输入的提示符的样子：默认是$
 * 然后前面可以自己定制主机名,
 * 这里为什么user有username这个属性，因为这个user是继承的定义的user类型
 * ok
 */
const prompt = computed(() => {
  return `[${user.value.username}]$`
})

/**
 * 终端主样式
 * 这里配置的是大写，是否全屏，主要是布局设置。
 * 背景图片设置在下面
 * ok
 */
const mainStyle = computed(() => {
  const fullScreenStyle: StyleValue = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
  // 这里的props.fullScreen是我们拿ts写的自定义配置
  return props.fullScreen
    ? fullScreenStyle
    : {
        height: props.height
      }
})

/**
 * 终端包装类主样式
 * 这里是背景图片设置
 * ok
 */
const wrapperStyle = computed(() => {
  const { background } = configStore
  const style = {
    ...mainStyle.value
  }
  if (background.startsWith('http')) {
    // 这里就是为什么我们可以自定义背景样式
    style.background = `url(${background})`
  } else {
    style.background = background
  }
  return style
})

/**
 * 清空所有输出
 */
const clear = () => {
  outputList.value = []
}

/**
 * 写命令文本结果
 * 这里就是我们输入命令后，输出的结果提示，是成功，失败...
 * @param text
 * @param status
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: 'text',
    status
  }
  // 上面我们不是将输入的命令包装成了一条命令并且将它赋值给了一个类似于temp的值吗，这里的currentNewCommand就是上面的temp
  currentNewCommand.resultList.push(newOutput)
}

/**
 * 写文本错误状态结果
 * @param text
 */
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, 'error')
}

/**
 * 写文本成功状态结果
 * @param text
 */
const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, 'success')
}

/**
 * 写结果
 * @param output
 */
const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output)
}

/**
 * 立即输出文本
 * @param text
 * @param status
 */
const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: 'text',
    status
  }
  outputList.value.push(newOutput)
}

/**
 * 设置命令是否可折叠
 * @param collapsible
 */
const setCommandCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible
}

/**
 * 立即输出
 * @param newOutput
 */
const writeOutput = (newOutput: OutputType) => {
  outputList.value.push(newOutput)
}

/**
 * 输入框聚焦
 */
const focusInput = () => {
  commandInputRef.value.focus()
}
/**
 * 获取输入框是否聚焦
 */
const isInputFocused = () => {
  return (
    (commandInputRef.value.input as HTMLInputElement) == document.activeElement
  )
}
/**
 * 设置输入框的值：可以实现命令提示补全
 */
const setTabCompletion = () => {
  if (hint.value) {
    inputCommand.value.text = `${hint.value.split(' ')[0]}${
      hint.value.split(' ').length > 1 ? ' ' : ''
    }`
  }
}

/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
  // 展开
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index
    })
  } else {
    // 折叠
    activeKeys.value = []
  }
}

/**
 * 操作终端的对象
 */
const terminal: TerminalType = {
  writeTextResult,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeResult,
  writeTextOutput,
  writeOutput,
  clear,
  focusInput,
  isInputFocused,
  setTabCompletion,
  doSubmitCommand,
  showNextCommand,
  showPrevCommand,
  listCommandHistory,
  toggleAllCollapse,
  setCommandCollapsible
}

/**
 * 只执行一次
 */
onMounted(() => {
  registerShortcuts(terminal) //注册快捷键
  const { welcomeTexts } = configStore //终端欢迎语
  if (welcomeTexts?.length > 0) {
    //如果有自定义的，就用自定义的
    welcomeTexts.forEach((welcomeText) => {
      terminal.writeTextOutput(welcomeText)
    })
  } else {
    terminal.writeTextOutput(
      `Welcome to y-Terminal, coolest browser index for geeks!`
      // `<a href="//github.com/mengqiuleo/y-terminal" target='_blank'> GitHub Open Source</a>`
    )
    terminal.writeTextOutput(
      `Author <a href="//blog.csdn.net/weixin_52834435?type=blog" target="_blank">coder_xiaoy</a>` +
        `: please input 'help' to enjoy🥳`
    )
    terminal.writeTextOutput('<br/>')
  }
})

/**
 * 当点击空白聚焦输入框
 */
function handleClickWrapper(event: Event): void {
  //@ts-ignore
  if (event.target.className === 'yi-terminal') {
    focusInput()
  }
}

defineExpose({
  terminal
})
</script>

<style scoped>
.yi-terminal-wrapper {
  background: black;
}

.yi-terminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

.yi-terminal::-webkit-scrollbar {
  display: none;
}

.yi-terminal span {
  font-size: 16px;
}

.yi-terminal
  :deep(.ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header) {
  color: white;
  padding: 0;
}

.yi-terminal :deep(.ant-collapse) {
  background: none;
}

.yi-terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.yi-terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
}

.terminal-row {
  text-align: left;
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
