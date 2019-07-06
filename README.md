# module_ui_app_svelte

# Created by: Lightnet

# License: MIT

# Stage Phase:
 * Prototype build testing layouts.
 
Code languages:
 * babeljs 6
 * javascript
 * nodejs
 * svelte 3

# Browser test:
 * chrome (pass) (main)
 * firefox (fail)
 * opera (pass)

# Information:
 Prototype build to create module layout application to render svelte in the way emulation blender3D format and style that is base on the idea. The hard part will be how to handle div content. Just idea design.

# Nodejs pacakges:
 * svelte 3.6.2
 * express 4.17.1
 * babel-core 6.26.3
 * rollup 1.16.3
 * gulp 4.0.2
 * webpack 4.32.2
 * gulp-nodemon 2.4.2

# Features:
 * right click context menu (wip)
 * menu (wip)
 * operator (wip)
 * layout Management (wip)
 * workspace (wip)
 * 3D (threejs / aframe) (wip)
 * Data Flow Node Editor (not worked on)
 * SVG (not worked on)
 * client / server rest API (wip)

# Notes:
 * To create operator, menu, and panel like other is tricky.
 * Work in progress test build.
 * Client browser build test.

# Github:
 * https://github.com/Lightnet/module_ui_app_svelte

# Glitch:
 * https://glitch.com/edit/#!/lightnet-module-ui-app-svelte

# Run:
```
npm install
```

```
gulp default
```

# Guide & Design:
 There will be static or root access to variable, functions, class and other things to keep things clean and simple. But it under going prototype testing of ideas. There no root acess when creating Svelte 3 html with javascript setup to instance the object or html.

```javascript
 //svelte 3
 import mjs from './mjs'
```
mjs short is module javascript

```python
import bpy
```

(need to fixed this later)

 It base on Blender3D python import bpy and layout design but have not worked out the structure design yet. Although it will hard to get access to parent to nodes linking to each others. That will take while to figure how to clean way to access.

 The reason to have module design and layout is to keep thing clean like blender3d to sort best to access. Since the scene is can be remade as long the objects are save in object data format like json.

 The static function and variable is used for object management as well holding data. For curent viewport screen when dealing with workspace area.