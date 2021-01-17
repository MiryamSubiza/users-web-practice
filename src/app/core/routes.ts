import { environment } from "src/environments/environment";

export const apiUrl = environment.apiUrl;
export const logInUrl = `${apiUrl}/users/login`;
export const signUpUrl = `${apiUrl}/users/postUser`;
export const usersUrl = `${apiUrl}/users/fromdb`;
