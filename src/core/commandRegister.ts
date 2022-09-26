/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:37:05
 * @LastEditTime: 2022-09-25 23:42:36
 */
import { CommandType } from './command'
import clearCommand from './commands/terminal/clearCommand'
import historyCommand from './commands/terminal/historyCommand'
import backgroundCommand from './commands/terminal/config/backgroundCommand'
import resetCommand from './commands/terminal/config/resetCommand'
import fanyiCommand from './commands/fanyi/fanyiCommand'
import helpCommand from './commands/terminal/help/helpCommand'
import infoCommand from './commands/terminal/info/infoCommand'
import hintCommand from './commands/terminal/config/hintCommand'
import musicCommand from './commands/relax/music/musicCommand'
import moyuCommand from './commands/relax/moyu/moyuCommand'
import shortcutCommand from './commands/terminal/shortcut/shortcutCommand'
import hotCommand from './commands/hot/hotCommand'

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  shortcutCommand,
  hotCommand,
  clearCommand,
  historyCommand,
  fanyiCommand,
  helpCommand,
  infoCommand,
  musicCommand,
  moyuCommand,
  backgroundCommand,
  resetCommand,
  hintCommand
]

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandMap[command.func] = command
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
