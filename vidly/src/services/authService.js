import axiosMethods from './httpService'
import config from './../config.json'
import jwtDecode from "jwt-decode";

const tokenKey = "token";

axiosMethods.setJwt(getJwt())

export async function login(email, password) {
    const response = await axiosMethods.post(config.apiEndpoint + "auth", {
        email: email,
        password: password
    });
    localStorage.setItem(tokenKey, response.data);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}

const auth = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}

export default auth