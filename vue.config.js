module.exports = {
  lintOnSave: false,
  pluginOptions: {
    preprocess: {
      moduleEntry: 'src/views/*/*Main.vue',
      codeSplitting: false
    },
    service: {
      mock: true
    }
  }
}
