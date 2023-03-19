/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 20:36:38
 * @LastEditTime: 2022-09-25 20:37:33
 */
import { Ref, ref } from 'vue'
import CommandOutputType = YiTerminal.CommandOutputType
import CommandInputType = YiTerminal.CommandInputType

/**
 * 查看历史功能
 * @param commandList
 * @param inputCommand
 */
const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: Ref<CommandInputType>
) => {
  /**
   * 当前查看的命令位置
   */
  const commandHistoryPos = ref(commandList.length)

  const listCommandHistory = () => {
    return commandList
  }

  const showNextCommand = () => {
    console.log(commandHistoryPos.value, commandList, inputCommand)
    if (commandHistoryPos.value < commandList.length - 1) {
      commandHistoryPos.value++
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    } else if (commandHistoryPos.value === commandList.length - 1) {
      commandHistoryPos.value++
      inputCommand.value.text = ''
    }
  }

  // 其实这里没啥难懂的，就是直接是有个指针，然后有个命令数组，然后我们每次移动指针，相当于索引，然后拿到数组中对应索引的text
  const showPrevCommand = () => {
    console.log(commandHistoryPos.value, commandList, inputCommand)
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    }
  }

  return {
    commandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand
  }
}

export default useHistory
