import { loggedInUser, isLoggedIn } from "../stores/user-store.js";

export const fetchUser = async (uid) => {
    return await fetch(`http://localhost:3333/api/users/${uid}`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            isLoggedIn.update(status => (status = true));
            loggedInUser.update(() => {
                return {
                    username: res.user.username,
                    email: res.user.email,
                    id: res.user.id
                };
            });
            return res;
        });
}