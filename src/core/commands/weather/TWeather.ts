/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:11:05
 * @LastEditTime: 2022-09-29 11:41:27
 */
export type Weather = {
  date: string
  daypower: string
  nightpower: string
  daytemp: string
  nighttemp: string
  dayweather: string
  nightweather: string
  daywind: string
  nightwind: string
  week: string
}

export type WeatherInfo = {
  weather_list: Weather[]
}
