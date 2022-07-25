const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fv929z',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://conexaoqa.herokuapp.com/"
  },
});
