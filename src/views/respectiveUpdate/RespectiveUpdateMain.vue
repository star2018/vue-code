<template>
  <div class="container">
    <div>
      <el-button @click="pushAfterAssign">赋值后再添加</el-button>
      <el-button @click="pushBeforeAssign">添加完再赋值</el-button>
      <el-button @click="pushThenSetObserve">添加后手动设置属性观察</el-button>
      <el-button @click="list = []">清空列表</el-button>
    </div>
    <ul class="list">
      <li v-for="item of list" :key="item.id">
        <span>{{ item.value }}</span>
        <el-button class="plus" size="mini" @click="item.value++">+</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RespectiveMain',
  data() {
    return {
      list: []
    }
  },
  methods: {
    pushAfterAssign() {
      const { list } = this
      const item = {}
      // 先进行新对象属性的赋值修改
      item.id = Date.now()
      item.value = 0
      // 再追加进列表
      list.push(item)
    },
    pushBeforeAssign() {
      const { list } = this
      const item = {}
      // 先追加进列表
      list.push(item)
      // 再对新对象属性进行赋值修改
      item.id = Date.now()
      item.value = 0
    },
    pushThenSetObserve() {
      const { list } = this
      const item = {}
      // 先追加进列表
      list.push(item)
      // 再手动设置属性观察
      this.$set(item, 'id', Date.now())
      this.$set(item, 'value', 0)
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.list {
  line-height: 2em;
}
.plus {
  margin-left: 8px;
}
</style>
