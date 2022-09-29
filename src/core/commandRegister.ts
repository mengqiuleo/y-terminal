/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:37:05
 * @LastEditTime: 2022-09-29 10:27:36
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
import baiduCommand from './commands/search/baiduCommand'
import githubCommand from './commands/search/githubCommand'
import googleCommand from './commands/search/googleCommand'
import zhihuCommand from './commands/search/zhihuCommand'
import gotoCommand from './commands/gotoCommand'
import dateCommand from './commands/dateCommand'
import juejinCommand from './commands/search/juejinCommand'
import csdnCommand from './commands/search/csdnCommand'
import weatherCommand from './commands/weather/weatherCommand'

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
  hintCommand,
  baiduCommand,
  githubCommand,
  googleCommand,
  zhihuCommand,
  gotoCommand,
  dateCommand,
  juejinCommand,
  csdnCommand,
  weatherCommand
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
