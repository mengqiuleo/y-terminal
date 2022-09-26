/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:32:09
 * @LastEditTime: 2022-09-25 23:44:30
 */
import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 摸鱼命令
 * @author pjy
 */
const moyuCommand: CommandType = {
  func: 'moyu',
  name: '摸鱼',
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./MoYuBox.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default moyuCommand
