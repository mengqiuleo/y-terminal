/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 17:41:56
 * @LastEditTime: 2022-09-27 18:16:04
 */
const { getWeather } = require('../thirdpart/weatherApi')
const MyError = require('../exception')
const {
  REQUEST_PARAMS_ERROR_CODE,
  THIRD_PART_SERVICE_ERROR_CODE
} = require('../exception/errorCode')

/**
 * 天气查询
 * @param {*} event
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getWeatherApi(event, req, res) {
  const { keywords } = event
  if (!keywords) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入正确城市')
  }
  const result = await getWeather(keywords)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  getWeatherApi
}
