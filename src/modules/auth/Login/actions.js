import { HttpPost } from "../../../config/api/service";
import {  profileSave } from "../../../config/store/global/actions";
import { CHANGE_PASSWORD, CHANGE_SHOW_PASSWORD, CHANGE_USERNAME, CLOSE_ERROR, ERROR_SUBMIT, INITIAL_STATE, RESET_ERROR, SUBMIT_DONE, SUBMIT_ONPROGRESS, UPDATE_ERROR_PASSWORD, UPDATE_ERROR_USERNAME } from "./types";

export const initialState = () => {
    return async (dispatch) => {
        dispatch({
            type: INITIAL_STATE,
        });
    }
}

export const changeUsername = (value) => {
    return {
        type: CHANGE_USERNAME,
        payload: value
    };
}

export const changePassword = (value) => {
    return {
        type: CHANGE_PASSWORD,
        payload: value
    };
}

export const changeShowPassword = () => {
    return {
        type: CHANGE_SHOW_PASSWORD,
    };
}

export const submitOnProgress = () => {
    return {
        type: SUBMIT_ONPROGRESS
    };
}

export const updateError = (value, section) => {
    if (section === 'username') {
        return {
            type: UPDATE_ERROR_USERNAME,
            payload: value
        }
    } else if (section === 'password'){
        return {
            type: UPDATE_ERROR_PASSWORD,
            payload: value
        }
    }

}

export const errorSubmit = (message) => {
    return {
        type: ERROR_SUBMIT,
        payload: message || "Oops error nih"
    }
}

export const resetError = () => {
    return {
        type: RESET_ERROR,
    }
}

export const submit = ({ email, password }) => {
    return async (dispatch) => {
        try {
            let reject = false;

            dispatch(resetError());

            if (!email) {dispatch(updateError('Email required', 'username')); reject = true};
            if (email && !email.includes('@')) {dispatch(updateError('Must in email format', 'username')); reject = true};
            if (!password) {dispatch(updateError('Password required', 'password')); reject = true};

            if(reject) return;

            dispatch(submitOnProgress())

            const user = await HttpPost('api/login-user', { email, password });

            dispatch({
                type: SUBMIT_DONE
            });

            dispatch(profileSave(user.access_token))
        } catch (error) {
            dispatch(errorSubmit(error.message));
        }
    }
}