import { CHANGE_PASSWORD, CHANGE_SHOW_PASSWORD, CHANGE_USERNAME, ERROR_SUBMIT, INITIAL_STATE, SUBMIT_DONE, SUBMIT_ONPROGRESS, UPDATE_ERROR_PASSWORD, UPDATE_ERROR_USERNAME } from "./types";

const initiate = {
    username: "",
    password: "",
    errorUsername: "",
    errorPassword: "",
    errorSubmit: "",
    isSubmited: false,
    showPassword: false,
}

const LoginReducer = (state = initiate, action) => {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case CHANGE_SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword
            }
        case UPDATE_ERROR_PASSWORD:
            return {
                ...state,
                errorPassword: action.payload
            }
        case UPDATE_ERROR_USERNAME:
            return {
                ...state,
                errorUsername: action.payload
            }
        case ERROR_SUBMIT:
            return {
                ...state,
                isSubmited: false,
                errorSubmit: action.payload,
            }
        case SUBMIT_ONPROGRESS:
            return {
                ...state,
                isSubmited: true,
                errorPassword: '',
                errorUsername: '',
                errorSubmit: '',
            }
        case SUBMIT_DONE:
            state = initiate;

            return state;
        default:
            return state;
    }
}

export default LoginReducer;