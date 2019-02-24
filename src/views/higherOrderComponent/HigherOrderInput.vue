<template>
  <div class="wrapper">
    <el-input v-bind="$attrs" v-on="$listeners" />
    <span class="suffix" @click="$emit('wow-wow')">我是一条漂亮的小尾巴～</span>
  </div>
</template>
<script>
export default {
  name: 'HigherOrderInput',
  inheritAttrs: false
}
</script>
<style lang="less" scoped>
.wrapper {
  display: inline-block;
}
.suffix {
  cursor: pointer;
  background-color: red;
  transition: background-color 1.5s;
}
.bone {
  .suffix {
    background-color: chartreuse;
  }
}
</style>
