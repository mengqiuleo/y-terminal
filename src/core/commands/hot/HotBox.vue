<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:30:08
 * @LastEditTime: 2022-09-26 21:15:37
-->
<template>
  <div>
    <div v-for="(song, index) in songList" :key="index">
      <a :href="`https://music.163.com/#/song?id=${song?.id}`" target="_blank">
        {{ song?.al?.name }}
      </a>
      <img :src="song?.al?.picUrl" height="23" :alt="song?.al?.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { listHotMusics } from './hotApi'
import { message } from 'ant-design-vue'

const songList = ref([] as any[])

onMounted(async () => {
  const res: any = await listHotMusics()
  if (res?.code === 0) {
    const songs = res.data
    songList.value = songs.slice(0, 10)
  } else {
    message.error('加载失败')
  }
})
</script>

<style scoped>
img {
  border-radius: 50%;
  margin-bottom: 2px;
  margin-left: 2px;
}
</style>
