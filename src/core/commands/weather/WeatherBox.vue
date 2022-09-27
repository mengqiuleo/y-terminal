<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:29:48
 * @LastEditTime: 2022-09-27 20:05:37
-->
<template>
  <div>
    <div>{{ weather }}</div>
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, onMounted, reactive } from 'vue'
import { getWeather } from './weatherApi'
import { Weather } from './TWeather'

export default {
  setup(){
    interface WeatherBoxProps {
      city: string
    }

    const props = withDefaults(defineProps<WeatherBoxProps>(), {})
    const { city } = toRefs(props)
    const errorHint = ref('')
    // let weather = reactive({})
    onMounted(async () => {
      const res: any = await getWeather(city.value)
      if (res) {
        const weatherMessage:Weather = res.data
        const weather = reactive(weatherMessage)
        console.log(weather)
        // weather = weatherMessage
        // console.log(weatherMessage)
      } else {
        errorHint.value = '未查询到天气'
      }
    })
  }
}

</script>
<style lang="" scoped></style>
