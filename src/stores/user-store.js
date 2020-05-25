import { writable } from "svelte/store"

const isLoggedIn = writable(false);
export { isLoggedIn }

const loggedInUser = writable({
    username: "",
    email: "",
    id: "",
});

export { loggedInUser }