/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:33:25
 * @LastEditTime: 2022-09-26 21:09:03
 */
import { CommandType } from '../../command'

/**
 * 掘金搜索命令
 * @author pjy
 */
const baiduCommand: CommandType = {
  func: 'juejin',
  name: '掘金搜索',
  alias: [],
  params: [
    {
      key: 'word',
      desc: '搜索内容',
      required: true
    }
  ],
  options: [
    {
      key: 'self',
      desc: '是否当前页面打开',
      alias: ['s'],
      type: 'boolean',
      defaultValue: false
    }
  ],
  action(options, terminal) {
    const { _, self } = options
    const word = _.length > 0 ? _[0] : ''
    let targetLink = `https://juejin.cn/search?utm_source=infinitynewtab.com&query=${word}`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default baiduCommand
