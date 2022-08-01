import { HttpGet, HttpPost } from "../../../config/api/service";
import { CHANGE_REASON, CHANGE_TASK, ERROR_REASON, ERROR_SUBMIT, ERROR_TASK, GET_USER_ABSESNCES, INITIAL_STATE, MODAL_CLOSE, MODAL_OPEN, SUBMIT_DONE, SUBMIT_ONPROGRESS } from "./types";


export const initialState = () => {
    return async (dispatch) => {
        const tasks = await HttpGet('api/v1/penugasan/list?page=0&size=10');

        let taskList = tasks.data.data.content.map(task => {
            return {
                value: task.id,
                label: task.deskripsi
            }
        });

        taskList.unshift({ value: "", label: "Penugasan" });

        dispatch({
            type: INITIAL_STATE,
            payload: {
                taskList
            }
        });

        const userTask = await HttpGet('api/v1/absensi/list?page=0&size=4');

        dispatch({
            type: GET_USER_ABSESNCES,
            payload: {
                userTasks: userTask.data.data.content,
                totalItems: userTask.data.data.totalElements
            }
        });
    }
}

export const changeReason = (value) => {
    return {
        type: CHANGE_REASON,
        payload: value
    };
}

export const changeSelect = (value) => {
    return {
        type: CHANGE_TASK,
        payload: value
    };
}

export const changeModalOpen = ({ title }) => {
    return {
        type: MODAL_OPEN,
        payload: {
            modalOpen: true,
            modalTitle: title,
            reason: "",
            task: "",
            errorReason: "",
            errorTask: ""
        }
    };
}

export const changeModalClose = () => {
    return {
        type: MODAL_CLOSE,
        payload: {
            modalOpen: false,
            task: "",
            reason: "",
            errorReason: "",
            errorTask: ""
        }
    };
}

export const submitOnProgress = () => {
    return {
        type: SUBMIT_ONPROGRESS
    };
}

export const submitDone = () => {
    return {
        type: SUBMIT_DONE
    };
}

export const updateError = (value, section) => {
    switch (section) {
        case "reason":
            return {
                type: ERROR_REASON,
                payload: value
            }
        case "task":
            return {
                type: ERROR_TASK,
                payload: value
            }
        default:
            break;
    }
}

export const errorSubmit = (value) => {
    return {
        type: ERROR_SUBMIT,
        payload: value ? value : "Oops error nih"
    }
}

export const submit = ({ type, reason, task }) => {
    return async (dispatch) => {
        try {
            let reject = false;

            dispatch(submitOnProgress());

            if (!reason) { reject = true; dispatch(updateError('Reason required', 'reason')) };
            if (!task) { reject = true; dispatch(updateError('Penugasan required', 'task')) };

            if (reject) { dispatch(errorSubmit()); return; };

            let payload = {
                type: type === 'Check In' ? "check_in" : "check_out",
                alasan: reason,
                penugasan: {
                    id: Number(task)
                }
            }

            await HttpPost('api/v1/absensi/save', payload);

            const userTask = await HttpGet('api/v1/absensi/list?page=0&size=4');

            dispatch({
                type: GET_USER_ABSESNCES,
                payload: {
                    userTasks: userTask.data.data.content
                }
            });

            dispatch(submitDone());
        } catch (error) {
            dispatch(errorSubmit(error.message));
        }
    }
}