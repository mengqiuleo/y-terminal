<!-- eslint-disable vue/require-v-for-key -->
<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:29:48
 * @LastEditTime: 2022-09-29 13:40:49
-->
<template>
  <div>
    <div class="weather-box">
      <div>🏙 城市：{{ props.city }}</div>
      <!-- 今天 -->
      <div>
        {{ weatherMessage.weather_list[0].date }}
        {{ getWeek(weatherMessage.weather_list[0].week) }} |
        {{ weatherMessage.weather_list[0].dayweather }}
        {{ weatherMessage.weather_list[0].daytemp }}℃/{{
          weatherMessage.weather_list[0].nighttemp
        }}℃ | 风力&风向： {{ weatherMessage.weather_list[0].daywind }}风
        {{ weatherMessage.weather_list[0].daypower }}
      </div>
      <!-- 后三天 -->
      <div class="future-weather">
        <div v-for="(item, index) in weatherMessage.weather_list">
          <div v-if="index > 0" class="future-item">
            <div class="item">
              {{ weatherMessage.weather_list[index].date.slice(5) }}
            </div>
            <div class="item">
              {{ getWeek(weatherMessage.weather_list[index].week) }}
            </div>
            <div class="item">
              {{ weatherMessage.weather_list[index].daytemp }}℃/{{
                weatherMessage.weather_list[index].nighttemp
              }}℃
            </div>
            <div class="item">
              {{ weatherMessage.weather_list[`0`].dayweather }}
            </div>
            <div class="item">
              {{ weatherMessage.weather_list[`0`].daywind }}风
              {{ weatherMessage.weather_list[`0`].daypower }}
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
import { getWeather } from './weatherApi'
import { Weather, WeatherInfo } from './TWeather'
// import weatherTemp from './weatherTemp.vue'

interface WeatherBoxProps {
  city: string
}

const props = withDefaults(defineProps<WeatherBoxProps>(), { city: '深圳' })
const errorHint = ref('')
const weatherMessage = reactive<WeatherInfo>({
  weather_list: [
    {
      date: 'xxx',
      daypower: '<3',
      nightpower: '<3',
      daytemp: '31',
      nighttemp: '26',
      dayweather: '多云',
      nightweather: '多云',
      daywind: '东',
      nightwind: '东',
      week: '4'
    }
  ]
})

const getWeek = (number: any) => {
  let weeks = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
  return weeks[number]
}

async function getWeatherData() {
  const res: any = await getWeather(props.city)
  if (res) {
    weatherMessage.weather_list = res.data
    console.log(weatherMessage.weather_list[0].date)
    // weather = reactive(weatherMessage);
    // const weather = reactive(weatherMessage)
    // weather = weatherMessage
  } else {
    errorHint.value = '未查询到天气'
  }
}
onMounted(() => {
  getWeatherData()
})
</script>
<style scoped>
.future-weather {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
}
.future-item {
  flex: 1;
  margin-right: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
  line-height: 30px;
  /* align-items: center; */
  /* vertical-align: middle; */
}
.item {
  text-align: center;
}
</style>
