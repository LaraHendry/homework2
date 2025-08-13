## Summary

This repo contains code for the QE foundation assessment 2. 

Cypress is used for writing tests and the tests are in Javascript.

The tests check the saucedemo website covering:
- user login
- purchasing item

## Install dependencies

Run command: npm i

BDD dependencies in use:

- @badeball/cypress-cucumber-preprocessor
- @bahmutov/cypress-esbuild-preprocessor esbuild
- @cypress/webpack-preprocessor webpack

View cypress.config.js and package.json for configuration

## Open cypress 

Run command: npx cypress open

- Cypress menu will open
- select e2e testing and preferred browser
- View test steps in modal