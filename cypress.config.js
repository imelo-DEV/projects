const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Ou o endereço/caminho onde o seu HTML/servidor roda
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});