/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 17:18:41
 * @LastEditTime: 2022-09-25 19:04:47
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
})
