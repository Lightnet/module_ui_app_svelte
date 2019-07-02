/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
}

// generateId :: Integer -> String
export function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

//let iddropmenu = generateId(20);