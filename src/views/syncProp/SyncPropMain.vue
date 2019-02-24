<template>
  <div>
    <el-button @click="visible = true">显示弹窗</el-button>
    <div>弹窗输入内容：{{ value }}</div>
    <custom-dialog :visible.sync="visible" v-model="value" />
  </div>
</template>
<script>
import CustomDialog from './CustomDialog'
export default {
  name: 'SyncPropMain',
  components: { CustomDialog },
  data() {
    return {
      visible: false,
      value: ''
    }
  }
}
</script>
<style scoped>
.el-button {
  margin-bottom: 16px;
}
</style>
