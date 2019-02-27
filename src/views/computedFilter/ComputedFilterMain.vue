<template>
  <div class="container">
    <div>
      <el-select v-model="filter.storageType">
        <el-option
          v-for="type of ['letter', 'number']"
          :key="type"
          :label="type"
          :value="type"
        />
      </el-select>
      <el-input placeholder="搜索" v-model="filter.keyword" clearable>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div v-if="filteredItems.length" class="button-bar">
      <el-button v-if="indeterminateChecked" type="text" @click="checkAll"
        >全选</el-button
      >
      <el-button v-else type="text" @click="clearChecked">清除</el-button>
      <el-button type="text" @click="removeChecked" :disabled="!checkedItems.length"
        >删除</el-button
      >
    </div>
    <ul>
      <li v-for="item of filteredItems" :key="item.id">
        <el-checkbox v-model="item.checked" />
        <span>{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ComputedFilter',
  data() {
    return {
      items: [],
      filter: {
        // 对相似特性的数据，进行收敛
        keyword: '',
        storageType: ''
      }
    }
  },
  computed: {
    filteredItems() {
      const {
        items,
        filter: { keyword }
      } = this
      const reg = new RegExp(keyword.replace(/[*.?+$^[\](){}|\\]/g, '\\$&'), 'i')
      return items.filter(({ value }) => reg.test(value))
    },
    checkedItems() {
      return this.filteredItems.filter((item) => item.checked)
    },
    indeterminateChecked() {
      return this.filteredItems.some((item) => !item.checked)
    }
  },
  watch: {
    filteredItems(items) {
      for (const item of items) {
        item.checked = false
      }
    },
    // 通过属性路径来观察某个值
    'filter.storageType': {
      handler(type) {
        this.fetchData(type)
      },
      immediate: true
    }
  },
  methods: {
    async fetchData(type) {
      this.items = await this.$http
        .get(`/getDataList?type=${encodeURIComponent(type)}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(({ data }) => (Array.isArray(data) ? data : []))
        .then((list) => list.map((item) => ({ ...item, checked: false })))
    },
    checkAll() {
      this.items.forEach((item) => {
        item.checked = true
      })
    },
    clearChecked() {
      this.items.forEach((item) => {
        item.checked = false
      })
    },
    removeChecked() {
      const { checkedItems } = this
      this.items = this.items.filter(
        ({ value }) => !checkedItems.some((item) => item.value === value)
      )
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
}
.el-select {
  width: 30%;
}
.el-input {
  width: 60%;
  margin-left: 8px;
}
</style>
