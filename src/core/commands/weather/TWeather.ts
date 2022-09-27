/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:11:05
 * @LastEditTime: 2022-09-27 18:28:47
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
	future: Weather[]
}

