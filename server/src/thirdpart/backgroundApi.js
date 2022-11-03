/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 20:48:53
 * @LastEditTime: 2022-11-03 14:53:43
 */
const axios = require('axios')

/**
 * 随机获取背景
 * @return {Promise<*[]>}
 */
async function getRandomBackground() {
  const api =
    'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
  let result = await axios.get(api).then((res) => res.data)
  result = `https://ch.bing.com` + result[`images`][0].url
  return result

  // 不行，返回的是图片，我们需要的是链接
  // const api = 'https://picsum.photos/1920/1080'
  // let result = await axios.get(api).then()
}

module.exports = {
  getRandomBackground
}
