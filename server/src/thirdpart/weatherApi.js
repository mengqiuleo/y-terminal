/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 20:48:53
 * @LastEditTime: 2022-11-03 22:50:58
 */
const axios = require('axios')

/**
 * 随机获取背景
 * @return {Promise<*[]>}
 */
async function getWeather(city) {
  const api = 'https://restapi.amap.com/v3/config/district?'
  let adcode = await axios
    .get(api, {
      params: {
        key: 'a4fd2e0bf9e71d24291d97dc9053fb43', //需要操作
        keywords: city
      }
    })
    .then((res) => res.data.districts[0].adcode)
  // console.log('adcode: ', adcode)

  const weatherApi = 'https://restapi.amap.com/v3/weather/weatherInfo?'
  let infoResult = await axios
    .get(weatherApi, {
      params: {
        key: 'a4fd2e0bf9e71d24291d97dc9053fb43', //需要操作
        city: adcode
      }
    })
    .then((res) => res.data.lives)
  // console.log('infoResult: ', infoResult)

  let featureResult = await axios
    .get(weatherApi, {
      params: {
        key: 'a4fd2e0bf9e71d24291d97dc9053fb43', //需要操作
        city: adcode,
        extensions: 'all'
      }
    })
    .then((res) => res.data.forecasts[0].casts)
  // console.log('featureResult: ', featureResult)

  // const allResult = { ...infoResult, ...featureResult }
  return featureResult
}

module.exports = {
  getWeather
}
