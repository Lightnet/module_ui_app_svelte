/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const count = createCount();

export const Sl_blogin = writable(false);

export const UserName = writable('Guest');
export const CharacterName = writable('None');
export const SessionHash = writable('');
export const AccessLevel = writable('None');

//export const sessionsalt = writable(0);
//export const hashkey = writable(0);

export const currentregion = writable('None');
export const sl_viewregion = writable('None');
export const sl_category = writable('None');
export const sl_context = writable('None');

