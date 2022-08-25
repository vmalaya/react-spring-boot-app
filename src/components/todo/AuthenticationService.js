import axios from "axios";
import {API_URL} from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser'
export const AUTHENTICATION_SESSION_ATTRIBUTE = 'authentication'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username);
        sessionStorage.setItem(AUTHENTICATION_SESSION_ATTRIBUTE, this.createJWTToken(token))
        this.setupAxiosInterceptors(sessionStorage.getItem(AUTHENTICATION_SESSION_ATTRIBUTE))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE);
        sessionStorage.removeItem(AUTHENTICATION_SESSION_ATTRIBUTE)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        return user !== null;
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) return ''
        else return user;
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                console.log("From setupAxiosInterceptors ")
                console.log(this.isUserLoggedIn())
                if (this.isUserLoggedIn()) config.headers.authorization = token
                return config
            }
        )
    }

}

export default new AuthenticationService()