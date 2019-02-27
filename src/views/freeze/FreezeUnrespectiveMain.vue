<template>
  <div class="stage">
    <el-button @click="toggle">快点我！</el-button>
    <div :class="{ matched: state.type === constants.type }">
      {{ state.type === constants.type ? '磨人的小妖精！' : '沉默的美大叔！' }}
    </div>
    <ul>
      <li v-for="item of items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
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
      // 冻结不需要进行响应式绑定的常量
      constants: Object.freeze({
        type: 'foo'
      }),
      // 冻结不需要进行值更新的数据
      items: Object.freeze([{ name: 'aaa', value: '1' }, { name: 'bbb', value: '2' }])
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
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px;
}
.el-button {
  margin-bottom: 16px;
}
</style>
