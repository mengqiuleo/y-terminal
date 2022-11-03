<!-- eslint-disable vue/require-v-for-key -->
<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:29:48
 * @LastEditTime: 2022-11-02 23:25:48
-->
<template>
  <div>
    <div class="article-box">
      <div class="article-container">
        <div v-for="item in articleMessage.article_list">
          <div @click="goto(item.href)">
            <div class="item">
              <a href="">
                <div>{{ item.title }}</div>
              </a>
            </div>
            <div class="item">
              {{ item.des }}
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 报错提示 -->
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  toRefs,
  ref,
  onMounted,
  withDefaults,
  defineProps,
  reactive
} from 'vue'
import { getArticle } from './articleApi'
import { Article, ArticleInfo } from './TArticle'

interface ArticleBoxProps {
  count: number
}

const goto = (href: any) => {
  window.open(href, '_blank')
}

const props = withDefaults(defineProps<ArticleBoxProps>(), { count: 20 })
const errorHint = ref('')
const articleMessage = reactive<ArticleInfo>({
  article_list: [
    {
      title: '完成Vue3.2+typescript项目有感',
      href: 'https://juejin.cn/post/7129307011765764110',
      des: '很早之前就看见尤大在说<script setup> + TS + Volar = 真香，但一直都没有去主动尝试过 前段时间恰好在网上看见了相关的项目，好奇心又被调动了......'
    }
  ]
})


async function getWeatherData() {
  const res: any = await getArticle(props.count)
  if (res) {
    articleMessage.article_list = res.data
    // console.log(res.data)
  } else {
    errorHint.value = '接口请求出错，请联系工作人员修复🐶'
  }
}
onMounted(() => {
  getWeatherData()
})
</script>
<style scoped>
</style>
