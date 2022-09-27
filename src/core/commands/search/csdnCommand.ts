/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:33:25
 * @LastEditTime: 2022-09-26 21:08:53
 */
import { CommandType } from '../../command'

/**
 * csdn搜索命令
 * @author pjy
 */
const baiduCommand: CommandType = {
  func: 'csdn',
  name: 'csdn搜索',
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
    // https://so.csdn.net/so/search?q=${word}&t=&u=&urw=
    let targetLink = `https://so.csdn.net/so/search?q=${word}&t=&u=&urw=`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default baiduCommand
