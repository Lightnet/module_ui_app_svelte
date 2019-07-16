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
 It base on Blender3D python design and as well layout UI but coded part in layout is not the same as used Svelte 3 to instance the object or html render UI that depend on code and setup.

```javascript
//svelte 3
import mjs from './mjs'
```
mjs short is module javascript

```python
import bpy
```

 It is base on Blender3D python import bpy. The reason to have module design and layout is to keep things clean like Blender3D to sort out the best ways to access. The scene and object scene can be remade as long as the objects are saved in object data format like json.

 The static functions and variables will hold into one file to management objects, events, and instances as well holding data types. For current viewport screen when dealing with workspace area.

 SVG html is being used for node editor current in prototype build to deal with vector grahpics. To develop logic, material, shader, and other things to save and load node editor visual programing.
