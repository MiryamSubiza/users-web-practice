import { environment } from "src/environments/environment";

export const apiUrl = environment.apiUrl;
export const usersUrl = `${apiUrl}/users`;
export const logInUrl = `${usersUrl}/login`;
export const signUpUrl = `${usersUrl}/signup`;
