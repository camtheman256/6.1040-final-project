# final-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

[Open API Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## MongoDB Atlas and Server setup

[MongoDB](https://mongodb.com)

After following the instructions above, you should have copied a secret that looks something like `mongodb+srv://xxxxxx:xxxxxxxxx@cluster0.yc2imit.mongodb.net/?retryWrites=true&w=majority`. Note that this allows complete access to your database, so do not include it anywhere that is pushed to GitHub or any other publicly accessible location.

To allow your local server to connect to the database you just created, create a file named `.env` in the project's root directory with the contents

```env
MONGO_SRV=mongodb+srv://xxxxxx:xxxxxxxxx@cluster0.yc2imit.mongodb.net/?retryWrites=true&w=majority
DB_NAME=kerb
```

where the secret is replaced with the one you obtained, and `DB_NAME` is the database name you want to use.

You can also optionally specify which `PORT` you want to use for the API server and a `SECRET` for your user sessions. Port 8000 is proxied for documentation purposes, so we recommend setting `PORT` to 8000.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
npm run dev-api
```

`dev-api` will automatically reload the server when you make changes to the API server, and requests will be proxied through the Vite dev server.

### View OpenAPI Docs

```sh
npm run dev-api
npm run docs
```

Then, open [127.0.0.1:8080](http://127.0.0.1), and you'll be able to browse and execute the OpenAPI endpoints.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
