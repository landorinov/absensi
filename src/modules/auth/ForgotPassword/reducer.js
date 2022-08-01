import { INITIAL_STATE } from "./types";

const initiate = {
    username: "",
    password: "",
    errorUsername: "",
    errorPassword: "",
    showForgot: false,
    forgotEmail: "",
    errorForgotEmail: "",
    otp: "",
    confirmPassword: "",
    isSubmitedLogin: false,
    isSubmitedForgot: false,
}

const LoginReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}

export default LoginReducer;