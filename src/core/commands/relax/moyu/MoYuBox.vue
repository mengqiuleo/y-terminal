<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:32:09
 * @LastEditTime: 2022-09-25 23:45:04
-->
<template>
  <div style="margin: 8px 0">
    <iframe
      :src="currentGame"
      class="main"
      frameborder="no"
      marginwidth="0"
      marginheight="0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const gameList = [
  'https://haiyong.site/moyu/shitoujiandaobu/',
  'https://haiyong.site/moyu/lion.html',
  'https://haiyong.site/moyu/shengchengshu.html',
  'https://haiyong.site/moyu/zhipaijiyi.html',
  'https://haiyong.site/moyu/doumao.html',
  'https://haiyong.site/moyu/dadishu.html',
  'https://haiyong.site/moyu/laganziguoguan/',
  'https://haiyong.site/moyu/danzhu.html',
  'https://haiyong.site/moyu/feiji.html',
  'https://haiyong.site/moyu/doudizhu.html',
  'https://haiyong.site/moyu/tiaofangzi.html',
  'https://haiyong.site/moyu/SpaceHuggers/',
  'https://haiyong.site/moyu/weijing/'
]

const currentGame = gameList[Math.floor(Math.random() * gameList.length)]
</script>

<style scoped>
.main {
  width: 100%;
  height: 80vh;
  min-height: 600px;
}
</style>
