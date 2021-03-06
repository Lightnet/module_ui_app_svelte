/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 */

//export function promiseTimeout(ms, promise){
function promiseTimeout(ms, promise){
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            //reject('Timed out in '+ ms + 'ms.')
            reject('false')
        }, ms)
    })
  
    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
}
exports.promiseTimeout = promiseTimeout;