/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-02 21:55:30
 * @LastEditTime: 2022-11-03 10:10:40
 */
import { CommandType } from '../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 返回随机文章
 *
 */
const weatherCommand: CommandType = {
  func: 'article',
  name: '掘金文章',
  desc: '随机文章',
  params: [],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options
    // if (_.length < 1) {
    //   terminal.writeTextErrorResult('参数不足')
    //   return
    // }
    const count = _[0]
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./articleBox.vue')),
      props: {
        count
      }
    }
    terminal.writeResult(output)
  }
}

export default weatherCommand
