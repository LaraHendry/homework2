import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    // remove error related to CORS policy when running tests locally
    chromeWebSecurity: false,

    // implement node event listeners here
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // return the config object as it might be modified by the plugin
      return config;
    },
    // specify the pattern for feature files
    specPattern: 'cypress/e2e/bdd/*.feature'
  },

});