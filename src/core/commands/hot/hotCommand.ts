import { CommandType } from '../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = YiTerminal.ComponentOutputType

/**
 * 热榜命令
 * @author pjy
 */
const hotCommand: CommandType = {
  func: 'hot',
  name: '热榜',
  alias: [],
  params: [
    {
      key: '热榜类别',
      desc: '要查询的热榜',
      required: false
    }
  ],
  options: [],
  collapsible: true,
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./HotBox.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default hotCommand
