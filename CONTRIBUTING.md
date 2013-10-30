# Contributing to jQuery Validation Plugin

Thanks for contributing! Here's a few guidelines to help your contribution get landed.

1. Make sure the problem you're addressing is reproducible. Use jsbin.com or jsfiddle.net to provide a test page.
2. Follow the [jQuery style guide](http://contribute.jquery.com/style-guides/js)
3. Add or update unit tests along with your patch. Run the unit tests in at least one browser (see below).
4. Run `grunt` (see below) to check for linting and a few other issues.
5. Describe the change in your commit message and reference the ticket, like this: "Fixed delegate bug for dynamic-totals demo. Fixes #51". If you're adding a new localization file, use something like this: "Added croatian (HR) localization"

## Build setup

1. Install [NodeJS](http://nodejs.org).
2. Install the Grunt CLI To install by running `npm install -g grunt-cli`. More details are available on their website http://gruntjs.com/getting-started.
3. Install the NPM dependencies by running `npm install`.
4. The build can now be called by running `grunt`.

## Creating a new Additional Method

If you've wrote custom methods that you'd like to contribute to additional-methods.js:

1. Create a branch
2. Add the method as a new file in src/additional
3. (Optional) Add translations to src/localization
4. Send a pull request to the master branch.

## Unit Tests

To run unit tests, you should have a local webserver installed and pointing at your workspace. Then open `http://localhost/jquery-validation/test` to run the unit tests. Start with one browser while developing the fix, then run against others before committing. Usually latest Chrome, Firefox, Safari and Opera and a few IEs.

## Linting

To run JSHint and other tools, use `grunt`. 
