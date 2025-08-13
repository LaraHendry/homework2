import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

async function setupNodeEvents(on, config) {
  // required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config)

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
               
                },
              ],
            },
          ],
        },
      },
    })
  );

  // return the config object as it might have been modified by the plugin
  return config;
}

export default defineConfig({
  e2e: {
    // find your BDD .feature files
    specPattern: "**/*.feature",
    
    setupNodeEvents,
  },
  // find the stepDefinition files corresponding to BDD file
  env: {
    stepDefinitions: "cypress/e2e/steps/**/*.js",
  },
  experimentalStudio: true,
});