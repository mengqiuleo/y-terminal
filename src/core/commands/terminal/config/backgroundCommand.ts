/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-09-26 21:11:07
 */
import { CommandType } from '../../../command'
import { useTerminalConfigStore } from './terminalConfigStore'
import axios from 'axios'
import myAxios from '../../../../plugins/myAxios'

/**
 * 切换终端背景
 * @author pjy
 */
const backgroundCommand: CommandType = {
  func: 'bg',
  name: '切换背景(bing每日壁纸)',
  alias: ['bg'],
  params: [
    {
      key: 'url',
      desc: '图片地址（不填则随机）',
      required: false
    }
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options
    let url = _[0]
    if (_.length > 0) {
      url = _[0]
    }
    const { setBackground } = useTerminalConfigStore()
    if (!url) {
      // 随机获取壁纸
      const res = await myAxios.post('/background/get/random')
      setBackground(res.data)
    }
    setBackground(url)
  }
}

export default backgroundCommand
