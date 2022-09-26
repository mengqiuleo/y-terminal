<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 18:27:02
 * @LastEditTime: 2022-09-26 10:18:07
-->
<template>
  <my-terminal
    ref="terminalRef"
    full-screen
    :on-submit-command="onSubmitCommand"
  />
</template>

<script setup lang="ts">
import { doCommandExecute } from "../core/commandExecutor"
import { defineComponent, ref } from 'vue'

const terminalRef = ref();

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  await doCommandExecute(inputText, terminal);
};


</script>
<style lang="" scoped></style>
