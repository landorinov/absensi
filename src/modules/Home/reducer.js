import { CHANGE_REASON, CHANGE_TASK, ERROR_REASON, ERROR_SUBMIT, ERROR_TASK, GET_USER_ABSESNCES, INITIAL_STATE, MODAL_CLOSE, MODAL_OPEN, SUBMIT_DONE, SUBMIT_ONPROGRESS } from "./types";

const initiate = {
    modalTitle: "",
    reason: "",
    task: "",
    errorReason: "",
    errorTask: "",
    userTasks: [],
    taskList: [],
    modalOpen: false,
    submitProgress: false,
}

const HomeReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case GET_USER_ABSESNCES:
            return {
                ...state,
                userTasks: action.payload.userTasks,
            };
        case CHANGE_REASON:
            return {
                ...state,
                reason: action.payload,
            };
        case CHANGE_TASK:
            return {
                ...state,
                task: action.payload,
            };
        case MODAL_CLOSE:
            return {
                ...state,
                ...action.payload,
            };
        case MODAL_OPEN:
            return {
                ...state,
                ...action.payload,
            };
        case ERROR_TASK:
            return {
                ...state,
                errorTask: action.payload
            }
        case ERROR_REASON:
            return {
                ...state,
                errorReason: action.payload
            }
        case SUBMIT_ONPROGRESS:
            return {
                ...state,
                errorReason: "",
                errorTask: "",
                submitProgress: true,
            }
        case ERROR_SUBMIT:
            return {
                ...state,
                submitProgress: false,
            }
        case SUBMIT_DONE:
            return {
                ...state,
                submitProgress: false,
                modalOpen: false,
                reason: "",
                task: "",
                errorReason: "",
                errorTask: "",
            }
        default:
            return state;
    }
}

export default HomeReducer;