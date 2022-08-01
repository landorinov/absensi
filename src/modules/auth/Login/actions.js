import { HttpPost } from "../../../config/api/service";
import {  profileSave } from "../../../config/store/global/actions";
import { CHANGE_PASSWORD, CHANGE_SHOW_PASSWORD, CHANGE_USERNAME, ERROR_SUBMIT, INITIAL_STATE, SUBMIT_DONE, SUBMIT_ONPROGRESS, UPDATE_ERROR_PASSWORD, UPDATE_ERROR_USERNAME } from "./types";

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
    }

    return {
        type: UPDATE_ERROR_PASSWORD,
        payload: value
    }
}

export const errorSubmit = () => {
    return {
        type: ERROR_SUBMIT,
        payload: "Oops error nih"
    }
}

export const submit = ({ email, password }) => {
    return async (dispatch) => {
        try {
            dispatch(submitOnProgress());

            if (!email) dispatch(updateError('Email required', 'username'));
            if (!password) dispatch(updateError('Password required', 'password'));

            if (!email || !password) { dispatch(errorSubmit()); return; }

            const user = await HttpPost('api/login-user', { email, password });

            dispatch({
                type: SUBMIT_DONE
            });

            dispatch(profileSave(user.data.data.access_token))
        } catch (error) {
            dispatch(errorSubmit());
        }
    }
}