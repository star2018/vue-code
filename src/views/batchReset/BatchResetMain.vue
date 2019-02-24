<template>
  <div>
    <el-button @click="visible = true">显示弹窗</el-button>
    <el-dialog title="关闭时重置" :visible.sync="visible" @closed="reset">
      <el-input class="input" v-model="object.foo" />
      <el-input class="input" v-model="object.bar" />
    </el-dialog>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
// 默认的数据
const defaultData = {
  visible: false,
  basic: '',
  // 引用类型值
  object: {
    foo: '',
    bar: ''
  },
  array: []
}
export default {
  data() {
    return {
      ...cloneDeep(defaultData)
    }
  },
  methods: {
    reset() {
      // 重置绑定数据为初始值
      Object.assign(this, cloneDeep(defaultData))
    }
  }
}
</script>
<style scoped>
.input {
  margin-bottom: 8px;
}
</style>
