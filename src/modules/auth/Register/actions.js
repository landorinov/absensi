import { HttpPost } from "../../../config/api/service";
import { profileSave } from "../../../config/store/global/actions";
import { CHANGE_CONFIRM_PASSWORD, CHANGE_DOMICILE, CHANGE_EMAIL, CHANGE_GENDER, CHANGE_INTEREST, CHANGE_NAME, CHANGE_PASSWORD, CHANGE_PHONE_NUMBER, CHANGE_SHOW_CONFIRM_PASSWORD, CHANGE_SHOW_PASSWORD, ERROR_CONFIRM_PASSWORD, ERROR_DOMICILE, ERROR_EMAIL, ERROR_GENDER, ERROR_INTEREST, ERROR_NAME, ERROR_PASSWORD, ERROR_PHONE_NUMBER, ERROR_SUBMIT, INITIAL_STATE, SUBMIT_DONE, SUBMIT_ONPROGRESS, } from "./types";

export const initialState = () => {
    return async (dispatch) => {
        dispatch({
            type: INITIAL_STATE,
        });
    }
}

export const changeName = (value) => {
    return {
        type: CHANGE_NAME,
        payload: value
    };
}

export const changePhoneNumber = (value) => {
    return {
        type: CHANGE_PHONE_NUMBER,
        payload: value
    };
}

export const changeEmail = (value) => {
    return {
        type: CHANGE_EMAIL,
        payload: value
    };
}

export const changeGender = (value) => {
    return {
        type: CHANGE_GENDER,
        payload: value
    };
}

export const changePassword = (value) => {
    return {
        type: CHANGE_PASSWORD,
        payload: value
    };
}

export const changeDomicile = (value) => {
    return {
        type: CHANGE_DOMICILE,
        payload: value
    };
}

export const changeInterest = (value) => {
    return {
        type: CHANGE_INTEREST,
        payload: value
    };
}

export const changeConfirmPassword = (value) => {
    return {
        type: CHANGE_CONFIRM_PASSWORD,
        payload: value
    };
}

export const changeShowPassword = () => {
    return {
        type: CHANGE_SHOW_PASSWORD,
    };
}

export const changeShowConfirmPassword = () => {
    return {
        type: CHANGE_SHOW_CONFIRM_PASSWORD,
    };
}

export const submitOnProgress = () => {
    return {
        type: SUBMIT_ONPROGRESS
    };
}

export const updateError = (value, section) => {
    switch (section) {
        case "email":
            return {
                type: ERROR_EMAIL,
                payload: value
            }
        case "phoneNumber":
            return {
                type: ERROR_PHONE_NUMBER,
                payload: value
            }
        case "name":
            return {
                type: ERROR_NAME,
                payload: value
            }
        case "password":
            return {
                type: ERROR_PASSWORD,
                payload: value
            }
        case "confirmPassword":
            return {
                type: ERROR_CONFIRM_PASSWORD,
                payload: value
            }
        case "gender":
            return {
                type: ERROR_GENDER,
                payload: value
            }
        case "interest":
            return {
                type: ERROR_INTEREST,
                payload: value
            }
        case "domicile":
            return {
                type: ERROR_DOMICILE,
                payload: value
            }
        default:
            break;
    }
}

export const clearErrorSubmit = () => {
    return {
        type: ERROR_SUBMIT,
        payload: ""
    }
}

export const errorSubmit = (value) => {
    return {
        type: ERROR_SUBMIT,
        payload: value ? value : "Oops error nih"
    }
}

export const submit = ({ name, email, phoneNumber, password, confirmPassword, gender, interest, domicile }) => {
    return async (dispatch) => {
        try {
            let reject = false;
            
            if (!email) { reject = true; dispatch(updateError('Email required', 'email')) };
            if (email && !email.includes('@')) { reject = true; dispatch(updateError('Must be email format', 'email')) };
            if (!name) { reject = true; dispatch(updateError('Name required', 'name')) };
            if (!password) { reject = true; dispatch(updateError('Password required', 'password')) };
            if (!confirmPassword) { reject = true; dispatch(updateError('Confirm Password required', 'confirmPassword')) };
            if (password != confirmPassword) { reject = true; dispatch(updateError('Password and Confirm not same', 'confirmPassword')) };
            if (!gender) { reject = true; dispatch(updateError('Gender required', 'gender')) };
            if (!phoneNumber) { reject = true; dispatch(updateError('Phone Number required', 'phoneNumber')) };
            if (!interest) { reject = true; dispatch(updateError('Interest required', 'interest')) };
            if (!domicile) { reject = true; dispatch(updateError('Domicile required', 'domicile')) };
            
            if (reject) { return; };
            
            dispatch(submitOnProgress());

            let payload = {
                email,
                name,
                domicile,
                gender,
                password,
                interest,
                phone_number: phoneNumber
            }

            const user = await HttpPost('api/register', payload);

            dispatch({
                type: SUBMIT_DONE
            });

            dispatch(profileSave(user.data.access_token))

        } catch (error) {
            dispatch(errorSubmit(error.message));
        }
    }
}