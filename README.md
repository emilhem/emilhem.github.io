# emilhem.github.io (source branch)

This branch is the source from which the `master` branch is created from.

## Requirements
Somewhat recent Node.js
NPM
[https://gulpjs.com/](Gulp "Streaming build system")

## Usage
Run `npm install`, then `gulp`. 

### What gulp does
Gulp nukes the `build` directory.
Gulp checks the `tmpGit` directory and pulls if there is a repo there, otherwise it clones the specified repo in`config.json`.
Gulp makes a copies that repo into `build` and then builds from the `src` dir to the `build` directory.

### What gulp doesn't do
Gulp doesn't add or commit the changes in the `build` directory. It therefore doesn't push the changes either. That is up to you to do at this time. Such functionality might be added later.
