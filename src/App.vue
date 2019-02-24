<template>
  <div id="app">
    <div class="nav-wrapper">
      <span class="nav" v-for="route of routes" :key="route.path">
        <router-link :to="route.path">{{ route.nav }}</router-link>
      </span>
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.prototype.$http = axios

const routes = []
const context = require.context('./views', true, /\w+Main\.vue$/)
for (const fileName of context.keys()) {
  routes.push({
    nav: fileName.substring(fileName.lastIndexOf('/') + 1).replace(/Main\.vue$/, ''),
    path: fileName
      .substring(fileName.indexOf('/'), fileName.indexOf('/', 3))
      .replace(/[A-Z]+/g, (t, index) => (!index ? t : `-${t}`).toLowerCase())
  })
}

export default {
  name: 'App',
  data() {
    return {
      routes
    }
  }
}
</script>

<style lang="less" scoped>
@import '~element-ui/lib/theme-chalk/index.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-wrapper {
  padding: 16px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.nav {
  margin: 12px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.view {
  padding-top: 24px;
}
</style>
