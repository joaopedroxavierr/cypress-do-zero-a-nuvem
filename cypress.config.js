const cypress = require('cypress')
const { defineConfig } = require('cypress')

const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    } 
  },
  projectId: "7s1pva"
})
