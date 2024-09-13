export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE = "api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const VERIFY_OTP = `${AUTH_ROUTE}/otp-verification`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTE}/update-profile`;