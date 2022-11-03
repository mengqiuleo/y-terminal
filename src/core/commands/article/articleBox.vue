<!-- eslint-disable vue/require-v-for-key -->
<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:29:48
 * @LastEditTime: 2022-11-03 14:11:27
-->
<template>
  <div>
    <div class="article-box">
      <div
        class="scroll-container"
        ref="scrollContainer"
        @scroll.passive="handleScroll"
      >
        <div :style="blankFillStyle">
          <!-- 显示列表数据 -->
          <div v-for="item in showDataList">
            <div @click="goto(item.href)" class="article">
              <div class="item">
                <a href="javascript:void(0)">
                  <div>{{ item.title }}</div>
                </a>
              </div>
              <div class="text">
                {{ item.des }}
              </div>
            </div>
          </div>

          <!-- 报错提示 -->
          <div v-if="errorHint">{{ errorHint }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  toRefs,
  ref,
  onMounted,
  withDefaults,
  defineProps,
  reactive,
  computed
} from 'vue'
import { getArticle } from './articleApi'
import { Article, ArticleInfo } from './TArticle'

interface ArticleBoxProps {
  count: number
}

const goto = (href: string) => {
  window.open(href, '_blank')
}

const props = withDefaults(defineProps<ArticleBoxProps>(), { count: 20 })
const errorHint = ref('')
const articleMessage = reactive<ArticleInfo>({
  article_list: []
})

// 为了实现虚拟滚动，对请求进行再次封装
let isRequestStatus: boolean
async function getData() {
  isRequestStatus = true //如果正在请求，去除并发请求
  const res: any = await getArticle(props.count)
  isRequestStatus = false
  return res.data
}

async function getArticleData() {
  const res: any = await getData()
  if (res) {
    articleMessage.article_list = res
    // console.log(res.data)
  } else {
    errorHint.value = '正在请求数据，请耐心等待~🐶'
  }
}

// --------------分割线：实现虚拟列表滚动------------------------
const scrollContainer = ref<any>()

const oneHeight = ref(55) //记录单条数据的高度
const containSize = ref(0) //当前容器可以容纳多少条数据
const startIndex = ref(0) //当前滚动的第一个元素的索引：根据滚动的位移，计算当前容器头部的第一条数据的索引
let isScrollStatus = true //记录当前是否滚动，节流

const endIndex = computed(() => {
  //计算属性：容器最后一个元素的索引
  let index = startIndex.value + containSize.value * 2
  if (!articleMessage.article_list[index]) {
    index = articleMessage.article_list.length - 1
  }
  return index
})
const showDataList = computed(() => {
  //定义一个当前显示的数组列表元素
  let newStartIndex = 0
  if (startIndex.value <= containSize.value) {
    newStartIndex = 0
  } else {
    newStartIndex = startIndex.value - containSize.value
  }
  return articleMessage.article_list.slice(newStartIndex, endIndex.value)
})
// const topBlankFill = computed(() => { //定义上空白的高度
//   return startIndex.value * oneHeight.value
// })
// const bottomBlankFill = computed(() => { //定义下空白的填充高度
//   return (articleMessage.article_list.length - endIndex.value) * oneHeight.value
// })
const blankFillStyle = computed(() => {
  //定义空白填充样式
  let newStartIndex = 0
  if (startIndex.value <= containSize.value) {
    newStartIndex = 0
  } else {
    newStartIndex = startIndex.value - containSize.value
  }
  return {
    paddingTop: newStartIndex * oneHeight.value + 'px',
    paddingBottom:
      (articleMessage.article_list.length - endIndex.value) * oneHeight.value +
      'px'
  }
})

const getContentSize = () => {
  //计算容器最多放几条数据
  containSize.value =
    ~~(scrollContainer.value?.offsetHeight / oneHeight.value) + 2
  console.log(containSize.value)
}
async function setDataStartIndex() {
  let currentIndex: number = ~~(
    scrollContainer.value?.scrollTop / oneHeight.value
  )
  if (currentIndex == startIndex.value) return
  startIndex.value = currentIndex
  // console.log(startIndex.value)
  if (
    startIndex.value + containSize.value >
      articleMessage.article_list.length - 1 &&
    !isRequestStatus
  ) {
    // console.log('滚动到了屏幕底部，追加请求新的数据')
    let newList: any = await getData()
    if (!newList) return
    articleMessage.article_list = [...articleMessage.article_list, ...newList]
  }
}

const handleScroll = () => {
  //监听滚动行为的方法
  if (isScrollStatus) {
    isScrollStatus = false
    //设置一个定时器，节流
    let myTimer = setTimeout(() => {
      isScrollStatus = true
      clearTimeout(myTimer)
    }, 30)
    // window.console.log('scroll active')

    setDataStartIndex()
  }
}

onMounted(() => {
  getContentSize()
  getArticleData()
})
</script>
<style scoped>
.article-box {
  display: block;
  border-top: 0px;
  /* 高度必须写死 */
  height: 330px;
}
.scroll-container {
  /* 滚动效果必须加 */
  overflow-y: auto;
  /* 宽高必须写死是100%，会继承父元素高度 */
  height: 100%;
  width: 100%;
}

::-webkit-scrollbar {
  width: 5px !important;
  height: 3px !important;
  border-radius: 10px;
}
/*定义滑块 样式*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  width: 1px;
  background: #cfd2cf;
}
/*定义滚动条轨道（凹槽）样式*/
::-webkit-scrollbar-track {
  will-change: transform;
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  opacity: 0.1;
  background: #3c4048;
}

.article {
  padding: 5px 5px 5px 5px;
  height: 55px;
  width: 1300px;
  cursor: pointer;
}
.text {
  width: 1300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
