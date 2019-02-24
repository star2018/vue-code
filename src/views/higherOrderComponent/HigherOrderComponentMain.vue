<template>
  <div>
    <higher-order-input
      v-model="value"
      @wow-wow="handleWoW"
      @click.native="handleClick"
      :class="{ bone }"
    />
    <div>输入框输入值：{{ value }}</div>
  </div>
</template>
<script>
import HigherOrderInput from './HigherOrderInput'
export default {
  name: 'HigherOrderComponentMain',
  components: { HigherOrderInput },
  data() {
    return {
      value: '',
      bone: false
    }
  },
  methods: {
    handleClick() {
      console.log('输入组件被点击了！')
    },
    handleWoW() {
      clearTimeout(this.timer)
      this.bone = true
      this.timer = setTimeout(() => {
        this.bone = false
      }, 3000)
    }
  }
}
</script>
