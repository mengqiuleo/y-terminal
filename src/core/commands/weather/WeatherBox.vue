<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:29:48
 * @LastEditTime: 2022-09-27 18:19:15
-->
<template>
  <div>
    <div></div>
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script setup lang='ts'>
import { toRefs, ref, onMounted } from 'vue'
import { getWeather } from './weatherApi'
interface WeatherBoxProps {
  city: string
}

const props = withDefaults(defineProps<WeatherBoxProps>(), {})
const { city } = toRefs(props)
let weatherMessage = ref('')
const errorHint = ref('')

onMounted(async () => {
  const res: any = await getWeather(city.value)
  if (res) {
    weatherMessage = res.data
    console.log(weatherMessage)
  } else {
    errorHint.value = '未查询到天气'
  }
})
</script>
<style lang='' scoped></style>
