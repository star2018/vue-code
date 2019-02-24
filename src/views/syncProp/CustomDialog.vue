<template>
  <el-dialog :visible.sync="visibility" title="自动同步属性的弹窗">
    <input :value="inputValue" @change="$emit('input-change', $event.target.value)" />
  </el-dialog>
</template>
<script>
export default {
  name: 'CustomDialog',
  props: {
    inputValue: {
      type: String,
      default: ''
    },
    visible: Boolean
  },
  model: {
    prop: 'inputValue',
    event: 'input-change'
  },
  data() {
    return {
      visibility: this.$props.visible
    }
  },
  watch: {
    visible(cur) {
      this.visibility = cur
    },
    visibility(cur) {
      this.$emit('update:visible', cur)
    }
  }
}
</script>
