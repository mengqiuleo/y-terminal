<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-29 10:58:01
 * @LastEditTime: 2022-09-29 11:32:59
-->
<template>
  <div className="mt-1 mb-2">
    <div className=" mb-2">🏙 城市：{weather.city}</div>
    <div className=" mb-2">
      {getToday()} {weather.realtime.info} {weather.realtime.temperature}℃ |
      风向&风力： {weather.realtime.direct} {weather.realtime.power} |
      空气指数： {weather.realtime.aqi}
    </div>
    <div className=" mb-2 flex">
      {weather.future.slice(1).map((info, index) => (
      <div
        key="{index}"
        className=" mx-3 flex flex-col justify-center items-center"
      >
        <div className=" my-1">
          {index === 0 ? '明天' : index === 1 ? '后天' : index === 2 ?
          getWeekByDate(info.date) : index === 3 ? getWeekByDate(info.date) :
          null}
        </div>
        <div className=" my-1">{info.date.slice(5)}</div>
        <div className=" my-1">{info.temperature}</div>
        <div className=" my-1">{info.weather}</div>
        <div className=" my-1">{info.wid.day}-{info.wid.night}</div>
      </div>
      ))}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { Weather } from './TWeather'
const props = defineProps<{
  weather: any
}>()

console.log(props)
</script>
<style scoped></style>
