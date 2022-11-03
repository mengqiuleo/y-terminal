<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 23:36:39
 * @LastEditTime: 2022-09-26 11:40:37
-->
<template>
  <div>关于本站：y-Terminal 极客范儿的浏览器主页</div>
  <!-- <div>
    <a href="https://github.com/mengqiuleo/y-terminal" target="_blank">
      代码开源，欢迎 star 和贡献~
    </a>
  </div> -->
  <div></div>
  <div>
    作者：
    <a href="https://blog.csdn.net/weixin_52834435?type=blog" target="_blank">
      程序员小y
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface InfoBoxProps {
  seconds: string
}

const props = withDefaults(defineProps<InfoBoxProps>(), {})
</script>

<style scoped></style>
