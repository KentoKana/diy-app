import { writable } from "svelte/store"

const isLoggedIn = writable(true);
export {isLoggedIn}