import { INITIAL_STATE } from "./types";

const initiate = {
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    errorEmail: "",
    errorOtp: "",
    errorPassword: "",
    errorConfirm: "",
    isSubmitedForgot: false,
    submitSuccess: false,
    step: 0,
}

const ForgotReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}

export default ForgotReducer;