/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-11-03 10:11:25
 */
import { CommandType } from '../../../command'
import { useTerminalConfigStore } from './terminalConfigStore'

/**
 * 重置配置
 * @author pjy
 */
const resetCommand: CommandType = {
  func: 'reset',
  name: '重置终端配置',
  alias: [],
  options: [],
  action(options, terminal): void {
    const { reset } = useTerminalConfigStore()
    reset()
    terminal.writeTextSuccessResult('已重置终端配置')
  }
}

export default resetCommand
