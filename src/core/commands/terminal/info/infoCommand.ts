/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-09-25 23:48:32
 */
import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 查看网站本身信息命令
 * @author yupi
 */
const infoCommand: CommandType = {
  func: 'info',
  name: '查看本站信息',
  alias: ['author', 'about'],
  options: [],
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./InfoBox.vue'))
    }
    terminal.writeResult(output)
  }
}

export default infoCommand
