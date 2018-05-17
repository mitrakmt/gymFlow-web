# GymFlow Web
## Table of Contents
- Setup
- Testing
- Git styling
- Shared components

## Setup
- Clone the project
- Install Yarn using your favorite package manager, i.e. `npm install -g yarn`
  - More on installing yarn [here](https://yarnpkg.com/en/docs/install)
- `yarn install`
- `yarn global add esdoc`
  - We use [esdoc](https://esdoc.org/) to generate a documentation page. Having it lets you update the generated HTML file.

## SCSS/CSS
We try to follow a BEM-like syntax for our classes. Don't know what BEM is? Google "BEM CSS".

In your stylesheet, nest elements within their block and use **@extend** to create modifiers that don't require dual classes added to the element. Do _not_ intentionally fully mirror the DOM in your nests.

See _Writing Maintanable SCSS/CSS_ in the **#esports-arena** channel in Slack.

## Testing
The test suite will be run anytime your local branch is pushed to its remote.

From a file structure standpoint, test files should live with the component they're testing. They should be in the same folder as the component, with a file prefix identical to the component to be tested and with `.test.js` appended. So for `MyComponent`, there should be two files: `myComponent.js` and `myComponent.test.js`.

If you're testing a component and running functions that are dependent on local state or the Redux store, you'll need [TBD].

### Styling
- Naming: filename.test.js
- Folder structure: Test files should be contained in the appropriate component's folder

### Run Tests Manually
- `yarn test`

## Debugging
Download React dev tools, either the [extension for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or the [standalone app shell](https://www.npmjs.com/package/react-devtools) for use with other browsers.

### Debugging with the standalone app shell
- `yarn start`
- `cd` into your project directory
- Run `react-devtools`
- A window pops up. Copy the provided script tags into `index.html`.
- Refresh the web app. The dev tools window should attempt to connect to React now. If you're on Safari on macOS 10.12.x, you may experience prolonged failed attempts to connect to React. You can mitigate this by using Safari Technology Preview or Chrome.

## Documentation
Documentation can be generated from in-line code comments. Follow [JSDoc](http://usejsdoc.org) style commenting, which is how [ESDoc](https://esdoc.org) (our document generation tool) knows what to generate. We're trying to get to 75% documentation coverage. :)

The documentation isn't hosted – it's generated and run locally.

### Generating the documentation
1. `cd` to the project root
2. Run `./node_modules/.bin/esdoc`
3. Open _./doc/esdoc/source.html_

## Git styling
### Commit tags
- [feature]
  - Any new development commits and updates should have this, up to the point that feature has made it to staging.
  - Extensive refactors.
- [req-change]
  - If the change is to an existing and already-deployed feature and was driven by a requirement change.
- [fix]
  - Bug fixes to deployed features.
- [cleanup]
  - Code cleanup or documentation, or minor refactors.

### Commit description
A short summary of what or why this code is being added.

### Story labels
Most development is probably associated with a story, i.e. ESACP-001. Label branch names with the story label pre-fixed, i.e. ESACP-001-feature-name. Label commits with the associated subtask, or, if there is none or there is only a generic subtask covering front-end development, then use the story label.

### Commit description
- [commit-tag] JIRAPREFIX-STORYNUMBER Single, short, descriptive summary line in the imperative present tense

// blank line

Thorough description of why the change is needed, how it addresses the issue and what side-effects it might have, in the past tense.
  - Example:
  
  [feature] ESACP-001 Add login view

  Added the login container and stylesheet.

## Shared Components
List of shared components, see the documentation for information on uage.
### Account Linking - shared-components/accountLinking

### Async Component Loader - shared-components/asyncComponentLoader.js

### Hex Image - shared-components/hexImage

### Input state updater - shared-components/inputStateUpdate.js

### Material UI Theme and Styles - shared-components/mui

### Particle Generator - shared-components/cern

### Private route - shared-components/privateRoute.js

### Set Account Link Cookie - shared-components/setAccountLinkCookie.js

### UI props - shared-components/props
_Note: not to be confused with React props. Here, props comes from the 3D graphics term meaning reusable visible objects. A "prop" is a set piece, something that will be user-viewable UI, that can be reused easily._
#### Bonus Header
#### Door
#### Progress Bar
#### Wall Torch

### User snapshot - shared-components/userSnapshot

### Validate input - shared-components/validateInput.js

### Webcam - shared-components/webcam
