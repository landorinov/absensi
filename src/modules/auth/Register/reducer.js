import { CHANGE_CONFIRM_PASSWORD, CHANGE_DOMICILE, CHANGE_EMAIL, CHANGE_GENDER, CHANGE_INTEREST, CHANGE_NAME, CHANGE_PASSWORD, CHANGE_PHONE_NUMBER, CHANGE_SHOW_CONFIRM_PASSWORD, CHANGE_SHOW_PASSWORD, ERROR_CONFIRM_PASSWORD, ERROR_DOMICILE, ERROR_EMAIL, ERROR_GENDER, ERROR_INTEREST, ERROR_NAME, ERROR_PASSWORD, ERROR_PHONE_NUMBER, ERROR_SUBMIT, INITIAL_STATE, SUBMIT_DONE, SUBMIT_ONPROGRESS } from "./types";

const initiate = {
    email: "",
    phoneNumber: "",
    name: "",
    domicile: "",
    gender: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    interest: "",
    errorName: "",
    errorPassword: "",
    errorConfirmPassword: "",
    errorPhoneNumber: "",
    errorGender: "",
    errorDomicile: "",
    errorInterest: "",
    errorEmail: "",
    errorSubmit: "",
    genders: [
        {
            label: "Gender",
            value: "",
        },
        {
            label: "Laki-Laki",
            value: "Laki-Laki",
        },
        {
            label: "Perempuan",
            value: "Perempuan",
        },
    ],
    domicilies: [
        {
            label: "Domicile",
            value: "",
        },
        {
            label: "DKI Jakarta",
            value: "DKI Jakarta",
        },
        {
            label: "Tangerang",
            value: "Tangerang",
        },
    ],
    interestList: [
        {
            label: "Interest",
            value: "",
        },
        {
            label: "Backend",
            value: "Backend",
        },
        {
            label: "QA",
            value: "QA",
        },
    ],
    isSubmited: false,
    showPassword: false,
}

const RegisterReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return state;
        case CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case CHANGE_CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: action.payload
            };
        case CHANGE_GENDER:
            return {
                ...state,
                gender: action.payload
            };
        case CHANGE_DOMICILE:
            return {
                ...state,
                domicile: action.payload
            };
        case CHANGE_INTEREST:
            return {
                ...state,
                interest: action.payload
            };
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case CHANGE_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.payload
            };
        case ERROR_NAME:
            return {
                ...state,
                errorName: action.payload
            };
        case ERROR_EMAIL:
            return {
                ...state,
                errorEmail: action.payload
            };
        case ERROR_PHONE_NUMBER:
            return {
                ...state,
                errorPhoneNumber: action.payload
            };
        case ERROR_PASSWORD:
            return {
                ...state,
                errorPassword: action.payload
            };
        case ERROR_CONFIRM_PASSWORD:
            return {
                ...state,
                errorConfirmPassword: action.payload
            };
        case ERROR_DOMICILE:
            return {
                ...state,
                errorDomicile: action.payload
            };
        case ERROR_GENDER:
            return {
                ...state,
                errorGender: action.payload
            };
        case ERROR_INTEREST:
            return {
                ...state,
                errorInterest: action.payload
            };
        case CHANGE_SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword
            };
        case CHANGE_SHOW_CONFIRM_PASSWORD:
            return {
                ...state,
                showConfirmPassword: !state.showConfirmPassword
            };
        case SUBMIT_ONPROGRESS:
            return {
                ...state,
                isSubmited: true,
                errorName: "",
                errorPassword: "",
                errorConfirmPassword: "",
                errorPhoneNumber: "",
                errorGender: "",
                errorDomicile: "",
                errorInterest: "",
                errorEmail: "",
                errorSubmit: "",
            };
        case ERROR_SUBMIT:
            return {
                ...state,
                isSubmited: false,
                errorSubmit: action.payload,
            }
        case SUBMIT_DONE:
            state = initiate;

            return state;
        default:
            return state;
    }
}

export default RegisterReducer;