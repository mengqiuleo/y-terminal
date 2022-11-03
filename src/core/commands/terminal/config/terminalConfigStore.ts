/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:46:11
 * @LastEditTime: 2022-11-03 14:45:42
 */
import { defineStore } from 'pinia'

/**
 * 终端配置状态存储
 *
 * @author pjy
 */

// 这里我们在本地localStorage的存储名称就叫terminalConfig，不过电脑会帮我们改成小写
export const useTerminalConfigStore = defineStore('terminalConfig', {
  state: () => ({
    // 背景
    background: 'black',
    // 输入提示
    showHint: true,
    // 终端欢迎语
    welcomeTexts: [] as string[]
  }),
  getters: {},
  // 持久化
  // 当我们刚打开页面，就会进行数据持久化
  persist: {
    key: 'terminal-config-store',
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log('load terminalConfigStore data start')
    },
    afterRestore: (context) => {
      console.log('load terminalConfigStore data end')
    }
  },
  actions: {
    setBackground(url: string) {
      if (!url) {
        return
      }
      this.background = url
    },
    /**
     * 设置或反转提示
     * @param hint
     * @return 修改后的提示开启 / 关闭状态
     */
    setOrToggleShowHint(hint?: string): boolean {
      // 反转提示
      if (!hint) {
        this.showHint = !this.showHint
        return this.showHint
      }
      // 设置提示
      if (hint === 'on') {
        this.showHint = true
      } else if (hint === 'off') {
        this.showHint = false
      }
      return this.showHint
    },
    /**
     * 修改终端提示语
     * @param welcomeTexts
     */
    setWelcomeTexts(welcomeTexts: string[]) {
      this.welcomeTexts = welcomeTexts
    },
    reset() {
      this.$reset()
    }
  }
})
