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
 * SVG (wip)
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
(need to fixed this later)

 It base on Blender3D python design. The root or static file from application to get context information from package file for javascript. It will be reworked once prototype built and tested function where code works in similar to python call. There no root access when creating Svelte 3 html with javascript setup to instance the object or html.

```javascript
//svelte 3
import mjs from './mjs'
```
mjs short is module javascript

```python
import bpy
```

 It will base on Blender3D python import bpy. But the javascript language is base on Svelte 3 and Babeljs. But the layout design have not worked on to create similar structure design yet. Although it will be hard to get access to parent to nodes linking to each other. That will take a while to figure how to clean way to access.

 The reason to have module design and layout is to keep things clean like Blender3D to sort best to access. The scene and object scene can be remade as long as the objects are saved in object data format like json.

 The static function and variable is used for object management as well holding data. For current viewport screen when dealing with workspace area.

# layout design
 It will be reworked using div attributes to tag check when split into div groups.
