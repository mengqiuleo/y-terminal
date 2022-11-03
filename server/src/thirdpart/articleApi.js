/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-02 22:35:39
 * @LastEditTime: 2022-11-03 10:08:39
 */
const axios = require('axios')

async function getArticle(count) {
  const api =
    'https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?aid=2608&uuid=7065882601848702499&spider=0'
  let random = Math.floor(Math.random() * 100 + 1) + ''
  let data = {
    id_type: 2,
    sort_type: 200,
    cate_id: '6809637767543259144',
    cursor: random,
    limit: count
  }
  let result = await axios.post(api, data).then((res) => res.data.data) //此时是data数组
  let len = result.length
  // console.log('result: ', result)
  // console.log('数组长度： ', len);
  let dataArr = []
  for (let i = 0; i < len; i++) {
    let obj = result[i]
    let href = 'https://juejin.cn/post/' + obj.article_id

    let article_info = obj.article_info
    let title = article_info.title
    let des = article_info.brief_content
    // console.log(article_id, title, des);
    let newObj = {}
    newObj.href = href
    newObj.title = title
    newObj.des = des
    // console.log('newObj: ', newObj)
    dataArr.push(newObj)
  }
  // console.log("dataArr: ", dataArr)
  return dataArr
}

module.exports = {
  getArticle
}
