## Installation

Copy the git repository:

```bash
https://github.com/saged-sama/Sveltekit-Hackathon-Template.git
```

Install the dependencies:

```bash
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Database

The pocketbase database is hosted on [pockethost](https://pockethost.io/)

To install pocketbase in the applicaiton:

```bash
npm i pocketbase@next --save
```

Usage:

```js
import PocketBase from 'pocketbase';

const url = 'https://example.pockethost.io/'
const client = new PocketBase(url)
```
