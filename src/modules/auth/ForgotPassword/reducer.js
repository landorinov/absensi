import { CHANGE_CONFIRM, CHANGE_EMAIL, CHANGE_OTP, CHANGE_OTP_SUCCESS, CHANGE_PASSWORD, ERROR_CONFIRM_PASSWORD, ERROR_EMAIL, INITIAL_STATE, RESEND_OTP, SUBMIT_BACK, SUBMIT_EMAIL, SUBMIT_ONPROGRESS, SUBMIT_OTP, SUBMIT_PASSWORD } from "./types";

const initiate = {
    email: "",
    otp: "",
    newPassword: "",
    newConfirmPassword: "",
    errorEmail: "",
    errorOtp: "",
    errorPassword: "",
    errorConfirm: "",
    isSubmitedForgot: false,
    successResend: false,
    submitSuccess: false,
    step: 0,
}

const ForgotReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            state = initiate;
            
            return state;
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case CHANGE_OTP:
            return {
                ...state,
                otp: action.payload
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                newPassword: action.payload
            }
        case CHANGE_CONFIRM:
            return {
                ...state,
                newConfirmPassword: action.payload
            }
        case CHANGE_OTP_SUCCESS:
            return {
                ...state,
                successResend: false
            }
        case ERROR_EMAIL:
            return {
                ...state,
                errorEmail: action.payload
            }
        case ERROR_CONFIRM_PASSWORD:
            return {
                ...state,
                errorConfirm: action.payload,
                isSubmitedForgot: false,
            }
        case RESEND_OTP:
            return {
                ...state,
                successResend: true
            }
        case SUBMIT_ONPROGRESS:
            return {
                ...state,
                isSubmitedForgot: true,
                errorEmail: "",
                errorOtp: "",
                errorPassword: "",
                errorConfirm: ""
            }
        case SUBMIT_BACK:
            return {
                ...state,
                step: state.step - 1
            }
        case SUBMIT_OTP:
            return {
                ...state,
                isSubmitedForgot: false,
                step: state.step + 1,
                otp: ""
            }
        case SUBMIT_PASSWORD:
            state = initiate;

            return {
                ...state,
                isSubmitedForgot: false,
                submitSuccess: true
            }
        case SUBMIT_EMAIL:
            return {
                ...state,
                isSubmitedForgot: false,
                step: state.step + 1
            }
        default:
            return state;
    }
}

export default ForgotReducer;