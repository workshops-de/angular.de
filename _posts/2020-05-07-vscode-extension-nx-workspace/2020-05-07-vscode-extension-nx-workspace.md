---
title: "VSCode extension inside nx workspace"
description: "Run an Angular webview in vscode."
author: "François Guezengar"
published_at: 2020-05-07 10:15:01.000000Z
categories: "vscode nx angular"
language: "en"
---

Building a good UX with VSCode extension can be difficult and might require to use webview. Here we see how nx workspace helps you a great vscode webview with Angular.

_This article is deeply inspired by [nx console](https://github.com/nrwl/nx-console) where most of the concepts come from._
_The code below is available in [this repository](https://github.com/GrandSchtroumpf/nx-vscode-example)._

## Create the workspace
Create an nx workspace. Let's keep it empty for now and use the angular CLI.
```cmd
npx create-nx-workspace studio
-> What to create in the new workspace: empty
-> CLI to power the Nx workspace      : Angular CLI

cd studio/
```

## Create vscode extension application

### Scaffold the app
vscode extension are node programs that run inside the ide.

We'll need `@nrwl/node` schematics for that :
```cmd
npm i -D @nrwl/node
ng generate @nrwl/node:application vs-code
```

### Setup vscode
This application is the empty point for your extension and requires the vsode api :
```cmd
npm i vscode
```

Now let's update the `main.ts` file inside our app :
```typescript
import { commands, ExtensionContext, window } from 'vscode';

// On activation
export function activate(context: ExtensionContext) {
  // Register command "start"
  commands.registerCommand('start', () => {
    window.showInformationMessage('Hello World');
  })
}
```

This code associates a callback that shows "Hello World" with the command "start", when the extension in activated. Now we need to :
- Create the command.
- Activate the extension when the command is triggered.

For that vscode needs a `package.json`. Let's add it **in the same folder as `main.ts`** :
```json
{
  "name": "studio",
  "version": "0.0.0",
  "main": "main.js",
  "engines": {
    "vscode": "^1.44.0"
  },
  "contributes": {
    "commands": [{
      "command": "start",
      "title": "Start My Extension"
    }]
  },
  "activationEvents": [
    "onCommand:start"
  ]
}
```

Let's keep it to the bare minimum for now:
- `contributes`: This is where we create the command "start"
- `activationEvents`: This will activate the extension when command "start" is triggered.

### Build the extension
When running `ng build vs-code` it will only outputs the `main.js` files, **not the `package.json`**.

To solve that let's update `angular.json` Under `projects/vs-code/architect/build/options/assets` add the path to `package.json`:
```json
"assets": [
  "apps/vs-code/src/assets",
  "apps/vs-code/src/package.json"
]
```

Run `ng build vs-code` again. Everything is ready !

## Setup launch.json & tasks.json
To run a vscode extension in development mode you need to create `launch.json` & `tasks.json` inside the folder `.vscode`.

I just pasted the code from the `yo` generator for vscode extension & change the `extensionDevelopmentPath` argument :

**`launch.json`**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Extension In Dev Mode",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}/dist/apps/vs-code"
      ],
      "trace": "false",
      "internalConsoleOptions": "openOnFirstSessionStart",
      "outFiles": [
        "${workspaceFolder}/dist/apps/vs-code"
      ],
      "preLaunchTask": "${defaultBuildTask}"
    }
  ]
}
```

**`tasks.json`**
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "watch",
      "problemMatcher": "$tsc-watch",
      "isBackground": true,
      "presentation": {
        "reveal": "never"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

> I'm pretty sure there is a bunch of improvement to do here. But it worked in my case so I didn't looked too much into details.

## Try it out
First build you node app :
```cmd
ng build vs-code --watch
```

Then press **F5**. It should open a new vscode window. For there hit `Ctrl+p` and write :
```cmd
> Start My Extension
```
If everything goes well, you should see a message "Hello World" 🎉.

> "Start My Extension" is the value we gave on the command "start" in the `package.json`.



## Create a Webview with Angular
vscode extensions are powerful but the exposed API is quite limited when it comes to user interaction.
Fortunately the API can run HTML code inside a webview. Let's update the `main.ts` :

```typescript
import { commands, ExtensionContext, window, ViewColumn } from 'vscode';

// On activation
export function activate(context: ExtensionContext) {
  // Register command "start"
  commands.registerCommand('start', () => {
    const panel = window.createWebviewPanel(
      'studio', // Key used to reference the panel
      'Studio', // Title display in the tab
      ViewColumn.Active, // Editor column to show the new webview panel in.
      { enableScripts: true });

    panel.webview.html = '<h1>Hello World</h1>';

    context.subscriptions.push(panel);
  })
}
```

If you didn't stop your debugger you just need to click Restart (Ctrl+Shift+F5). And play "Start My Extension".

Now you should see "Hello World" in a new tab 🎉.

This is a good start, but as you can imagine it's going to be a pain to build a decent UX with a single html string. Let's see how we can connect an Angular application instead.


### Create Angular Application
Create the application
```cmd
npm i -D @nrwl/angular
ng generate @nrwl/angular:application studio
```

The first thing to do it update the `outputPath` of the angular application to put it inside the dist folder of the `vs-code` extension:

In `angular.json` change `projects/studio/architect/build/options/outputPath` to :
```json
"outputPath": "dist/apps/vs-code/studio"
```

Also, because your app is not served by a server you need to `useHash` for your router :
```typescript
RouterModule.forRoot([], { useHash: true })
```

run `ng build studio`. The application will be outputed inside the `vs-code` project.

### Run angular inside webview
Now we would like to do something like that :
```typescript
import { promises as fs } from 'fs'; // Require @types/node@latest
import { join } from 'path';

// On activation
export function activate(context: ExtensionContext) {
  // Register command "start"
  commands.registerCommand('start', async () => {
    ...
    const indexPath = join(context.extensionPath, 'studio/index.html');
    const html = await fs.readFile(indexPath, 'utf-8');
    panel.webview.html = html;
    ...
  })
}
```

But webview required special vscode [URI to load local content](https://code.visualstudio.com/api/extension-guides/webview#loading-local-content). For that we need to transform all `src` & `href` into an URI. We can achieve that with a regex :

```typescript
const html = await fs.readFile(join(context.extensionPath, 'studio/index.html'), 'utf-8');

// 1. Get all link prefixed by href or src
const matchLinks = /(href|src)="([^"]*)"/g;
// 2. Transform the result of the regex into a vscode's URI format
const toUri = (_, prefix: 'href' | 'src', link: string) => {
  // For <base href="#" />
  if (link === '#') {
    return `${prefix}="${link}"`;
  }
  // For scripts & links
  const path = join(context.extensionPath, 'studio', link);
  const uri = Uri.file(path);
  return `${prefix}="${panel.webview['asWebviewUri'](uri)}"`;
};
// 3. Replace the all link from the index.html into a URI format
panel.webview.html = html.replace(matchLinks, toUri);
```

Ok, if like me you're not a regex wizard, let's take a closer look :
1. This regex will capture all links prefixed by either "href" or "src" in the built index.html.
2. We transform the result of the match into a URI based that point to right directory.
3. We replace all links with the right URI.

> At the time of writing (May 2020) the `asWebviewUri` isn't available in the types of "webview" but is in the doc & works.

Here is the full code :
```typescript
import { commands, ExtensionContext, window, ViewColumn, Uri } from 'vscode';
import { promises as fs } from 'fs';
import { join } from 'path';

// On activation
export function activate(context: ExtensionContext) {
  // Register command "start"
  commands.registerCommand('start', async () => {
    const panel = window.createWebviewPanel(
      'studio',
      'Studio',
      ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [Uri.file(join(context.extensionPath, 'studio'))]
      });

    const html = await fs.readFile(join(context.extensionPath, 'studio/index.html'), 'utf-8');

    const matchLinks = /(href|src)="([^"]*)"/g;
    const toUri = (_, prefix: 'href' | 'src', link: string) => {
      // For <base href="#" />
      if (link === '#') {
        return `${prefix}="${link}"`;
      }
      // For scripts & links
      const path = join(context.extensionPath, 'studio', link);
      const uri = Uri.file(path);
      return `${prefix}="${panel.webview['asWebviewUri'](uri)}"`;
    };

    panel.webview.html = html.replace(matchLinks, toUri);

    context.subscriptions.push(panel);
  })
}
```

> The snippet above adds `localResourceRoots` in the options to make sure we can only load local content from this directory.

### Build and test
Let's run everything.
```cmd
ng build studio --prod
ng build vs-code
```
Then press "F5" to open a new window and inside :
- Press Ctrl+P
- Write "Start Extension"

Now your angular application should open on a new tab 🚀


## Watch
Our application is running in a webview but if we change something inside it doesn't update the webview.

### Listen on changes
The idea is to listen on file changes, and reassign the `webview.html`.
In `main.ts` let's add a listener in development mode :
```typescript
const index = join(context.extensionPath, 'studio/index.html');

// Refresh the webview on update from the code
const updateWebview = async () => {
  const html = await fs.readFile(index, 'utf-8');
  panel.webview.html = html.replace(matchLinks, toUri);
}

// In dev mode listen on changes from index.html & update the view
if (!environment.production) {
  watch(index).on('change', updateWebview)
}
// First render
updateWebview();
```

For this to work we need to enable `outputHashing` in development mode for our angular app.
In `angular.json` update `projects/studio/architect/build/options/outputHashing` to "all"
```json
"outputHashing": "all"
```

> Each time a change occurs in the code, every chunk depending on this change will be triggered will have a new hash. `index.html` beeing the root we should catch all changes.

### Build and watch

Now we need to build our extension & angular application in watch mode in two terminals :

```cmd
ng build studio --watch
ng build vs-code --watch
```

Press "F5", run the command and change your code to see the refresh.

### Hot Module Reload
I didn't implemented yet, but a little bit of code we should be able to create a Hot Module Reload by keeping the state in the extension. It's actually recommended to keep the application stateless and pass set the state on vscode with [`setState` & `getState`](https://code.visualstudio.com/api/extension-guides/webview#persistence).


## Conclusion
After a little bit of work we have everything needed to build our vscode extension with a webview. Now you can shre your libraries with the extension & webview.

### Limitations
The main limitation I found was the inability to use lazy loaded modules. I think it's because of the vscode URI requirement, but it might comes from somewhere else...

### Thanks
Special thanks to the Nrwl team for building nx workspace & nx console. Please take a look at the [nx console repository](https://github.com/nrwl/nx-console) for more advanced settings (test, ci, ...).
Also many thanks to Bruce Delorme for his help with the Regular Expression.