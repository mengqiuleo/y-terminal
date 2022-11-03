<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 18:27:02
 * @LastEditTime: 2022-11-03 21:55:36
-->
<template>
  <my-terminal
    ref="terminalRef"
    full-screen
    :on-submit-command="onSubmitCommand"
  />
</template>
<!-- 这里引用子组件: my-terminal, 但是没有明显的引入,不知道咋引入的。onSubmitCommand属性是必传，子组件的props可以从118行（子组件）看见  -->

<script setup lang="ts">
import { doCommandExecute } from '../core/commandExecutor'
import { defineComponent, ref } from 'vue'

const terminalRef = ref()

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return
  }
  const terminal = terminalRef.value.terminal
  await doCommandExecute(inputText, terminal)
}
</script>
<style lang="" scoped></style>
