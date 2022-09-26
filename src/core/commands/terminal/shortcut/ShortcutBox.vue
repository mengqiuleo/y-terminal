<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-09-25 23:49:29
-->
<template>
  <div>
    <div>快捷键：</div>
    <div v-for="(shortcut, index) in shortcutList" :key="index">
      <a-row v-if="shortcut.desc" :gutter="16">
        <a-col :span="4">{{ shortcut.keyDesc ?? shortcut.code }}</a-col>
        <a-col :span="4">{{ shortcut.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { shortcutList } from '../../../../components/myTerminal/shortcuts'

onMounted(() => {})
</script>

<style scoped></style>
