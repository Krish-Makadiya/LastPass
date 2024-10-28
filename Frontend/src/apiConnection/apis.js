const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const user = {
    LOGIN_API: `${BASE_URL}/login`,
    SIGNUP_API: `${BASE_URL}/signup`,
    USER_DATA_API: `${BASE_URL}/get-user-data`,
    DELETE_ACCOUNT_API: `${BASE_URL}/delete-account`,
    RESET_PASSWORD_API: `${BASE_URL}/reset-password`,
    RESET_PASSWORD_TOKEN_API: `${BASE_URL}/reset-password-token`,
};

export const password = {
    GET_ALL_PASSWORDS_API: `${BASE_URL}/get-all-passwords`,
    ADD_PASSWORD_API: `${BASE_URL}/add-password`,
    DELETE_PASSWORD_API: `${BASE_URL}/delete-password`,
};
