/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-27 17:41:56
 * @LastEditTime: 2022-11-02 23:00:43
 */
const { getArticle } = require('../thirdpart/articleApi')
const MyError = require('../exception')
const {
  REQUEST_PARAMS_ERROR_CODE,
  THIRD_PART_SERVICE_ERROR_CODE
} = require('../exception/errorCode')

/**
 * 文章查询
 * @param {*} event
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getArticleApi(event, req, res) {
  const { count } = event
  if (!count) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入正确参数')
  }
  const result = await getArticle(count)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  getArticleApi
}
