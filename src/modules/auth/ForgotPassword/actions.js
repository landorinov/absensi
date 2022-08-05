import { HttpPost } from "../../../config/api/service";
import { CHANGE_CONFIRM, CHANGE_EMAIL, CHANGE_OTP, CHANGE_OTP_SUCCESS, CHANGE_PASSWORD, ERROR_CONFIRM_PASSWORD, ERROR_EMAIL, ERROR_OTP, INITIAL_STATE, RESEND_OTP, SUBMIT_BACK, SUBMIT_EMAIL, SUBMIT_ONPROGRESS, SUBMIT_OTP, SUBMIT_PASSWORD } from "./types";

export const initialState = () => {
    return async (dispatch) => {
        dispatch({
            type: INITIAL_STATE,
        });
    }
}

export const changeEmail = (value) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_EMAIL,
            payload: value,
        })
    }
}

export const changeOtp = ({email, value}) => {
    return async (dispatch) => {
        try {
            if(!Number(value) && (Number(value) != 0)){
                return;
            }

            dispatch({
                type: CHANGE_OTP,
                payload: value,
            });
    
            if(value.length > 3){
                dispatch(submitOnProgress());

                await HttpPost('api/forget-password/validate', {email, otp: value});

                dispatch({
                    type: SUBMIT_OTP,
                });
            }
        } catch (error) {
            dispatch({
                type: ERROR_OTP,
                payload: error.message
            })
        }
    }
}

export const changePassword = (value) => {
    return async (dispatch) => {
            dispatch({
                type: CHANGE_PASSWORD,
                payload: value,
            });
    }
}

export const changeConfirm = (value) => {
    return async (dispatch) => {
            dispatch({
                type: CHANGE_CONFIRM,
                payload: value,
            });
    }
}

export const submitOnProgress = () => {
    return {
        type: SUBMIT_ONPROGRESS
    }
}

export const back = () => {
    return {
        type: SUBMIT_BACK
    }
}

export const submitEmail = (email) => {
    return async (dispatch) => {
        try {
            dispatch(submitOnProgress());

            if(!email) {
                dispatch({ type: ERROR_EMAIL, payload: "Fill up the email field!"});
                return;
            }

            if(email && !email.includes('@')) {
                dispatch({ type: ERROR_EMAIL, payload: "Must in email format!"});
                return;
            }

            await HttpPost('api/forget-password/send', {email});

            dispatch({
                type: SUBMIT_EMAIL
            })
        } catch (error) {
            dispatch({ type: ERROR_EMAIL, payload: error.message});
        }
    }
}

export const submitPassword = ({email, password, confirm}) => {
    return async (dispatch) => {
        try {
            dispatch(submitOnProgress());

            if((password.length != confirm.length) && (password != confirm)) {
                dispatch({ type: ERROR_CONFIRM_PASSWORD, payload: "Password dan Confirm Password not same"});
                return;
            } 

            await HttpPost('api/forget-password/change-password', {email, newPassword: password, confirmNewPassword: confirm});

            dispatch({
                type: SUBMIT_PASSWORD
            })
        } catch (error) {
            dispatch({ type: ERROR_CONFIRM_PASSWORD, payload: error.message });
                
        }
    }
}

export const resendOtp = (email) => {
    return async (dispatch) => {
        try {

            await HttpPost('api/forget-password/resend', {email});

            dispatch({
                type: RESEND_OTP
            })
        } catch (error) {
            dispatch({
                type: ERROR_OTP,
                payload: error.message
            })
        }
    }
}

export const changeOtpSuccess = () => {
    return async (dispatch) => {
            dispatch({
                type: CHANGE_OTP_SUCCESS
            })
    }
}