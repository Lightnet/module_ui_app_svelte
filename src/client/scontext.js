/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { writable } from 'svelte/store';
//https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
//https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
//https://stackoverflow.com/questions/47383375/how-can-i-export-static-function-in-es6

export const currentregion = writable('None');
export const sl_viewregion = writable('None');
export const sl_category = writable('None');
export const sl_context = writable('None');

export const Sl_Mouseregion = writable('None');

export default {
    currentregion,
    sl_viewregion,
    sl_category,
    sl_category,
    sl_context,
    Sl_Mouseregion
}