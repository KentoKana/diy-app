import { loggedInUser, isLoggedIn } from "../stores/user-store.js";

/**
 * 
 * @param { String } jwt 
 * @returns { Promise } User Object based on JWT 
 */
export const fetchUserByJWT = async (jwt) => {
    return await fetch(`http://localhost:3333/api/users/${jwt}`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            isLoggedIn.update(status => (status = true));
            loggedInUser.update(() => {
                return res.user
            });
            return res;
        });
}

/**
 * 
 * @param { String } Username 
 * @returns { Promise } User Object based on username
 */
export const fetchUserByUsername = async (username) => {
    return await fetch(
        `http://localhost:3333/api/getUserByUsername/${username}`
    )
        .then(res => {
            return res.json();
        })
        .then(user => {
            return user;
        });
}