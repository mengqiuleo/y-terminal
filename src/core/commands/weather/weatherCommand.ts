/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-26 21:18:01
 * @LastEditTime: 2022-09-27 17:36:08
 */
import { CommandType } from '../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 查看天气命令
 *
 */
const weatherCommand: CommandType = {
  func: 'weather',
  name: '天气',
  desc: '天气查询',
  params: [
    {
      key: 'city',
      desc: '城市名称（不填则查询指定城市）',
      required: false
    }
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options
    // if (_.length < 1) {
    //   terminal.writeTextErrorResult('参数不足')
    //   return
    // }
    const city = _[0]
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./WeatherBox.vue')),
      props: {
        city
      }
    }
    terminal.writeResult(output)
  }
}

export default weatherCommand
