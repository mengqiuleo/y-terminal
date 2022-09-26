/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-09-25 23:43:08
 */
import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 快捷键命令
 * @author pjy
 */
const shortcutCommand: CommandType = {
  func: 'shortcut',
  name: '快捷键',
  desc: '查看快捷键',
  alias: [],
  params: [],
  options: [],
  collapsible: true,
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./ShortcutBox.vue'))
    }
    terminal.writeResult(output)
  }
}

export default shortcutCommand
