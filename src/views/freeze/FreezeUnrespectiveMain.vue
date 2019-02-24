<template>
  <div>
    <el-button @click="toggle">快点我！</el-button>
    <div class="stage" :class="{ matched: state.type === constants.type }">
      {{ state.type === constants.type ? '妖娆的小妖精！' : '沉默的猥大叔！' }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FreezeMain',
  data() {
    return {
      state: {
        type: 'bar'
      },
      // 冻结不需要进行响应式绑定的常量数据
      constants: Object.freeze({
        type: 'foo'
      })
    }
  },
  methods: {
    toggle() {
      this.state.type = this.state.type === 'foo' ? 'bar' : 'foo'
      this.constants.type = 'foo'
    }
  }
}
</script>
<style scoped>
.matched {
  color: #00d500;
}
.stage {
  padding: 32px;
}
</style>
