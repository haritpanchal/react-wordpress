import { WP_URL } from "./WPConfig";

// AUTH APIS
export const LOGIN_API = WP_URL + "/auth/login";
export const REGISTER_API = WP_URL + "/auth/register";
export const GET_ALL_USERS_API = WP_URL + "/auth/getAllUsers";

// USER APIS
export const GET_USER_DETAILS = WP_URL + "/user/getDetails";
export const DELETE_USER = WP_URL + "/user/deleteUser";
export const UPDATE_USER = WP_URL + "/user/updateDetails";
export const FORGOT_PASSWORD_API = WP_URL + "/user/forgotPassword";
export const CHANGE_PASSWORD_API = WP_URL + "/user/changePassword";
export const CONFIRM_OTP_API = WP_URL + "/user/confirmOTP";
export const RESET_PASSWORD_API = WP_URL + "/user/resetPassword";
