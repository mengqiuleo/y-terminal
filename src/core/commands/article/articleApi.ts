/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-02 21:55:06
 * @LastEditTime: 2022-11-03 13:13:00
 */
import myAxios from '../../../plugins/myAxios'

/**
 * 返回随机文章
 */
export const getArticle = async (count: number) => {
  if (!count) {
    count = 20
  }
  return await myAxios.post('/article', { count })
}
