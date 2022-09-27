/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 08:35:52
 * @LastEditTime: 2022-09-27 18:09:17
 */
import myAxios from '../../../plugins/myAxios'

/**
 * 查询天气
 */
export const getWeather = async (keywords: string) => {
  if (!keywords) {
    keywords = '深圳'
  }
  return await myAxios.post('/weather', { keywords })
}

