import { HttpGet, HttpPost, HttpGetLMS } from "../../../config/api/service";
import { INITIAL_STATE, GET_USER_ABSESNCES } from "./types";

export const initialState = () => {
    return async (dispatch) => {
        const response = await HttpGetLMS('api/employee_client?page=0&size=10');
        // const tasks = await HttpGet('api/v1/penugasan/list?page=0&size=10');

        // let taskList = tasks.data.data.content.map(task => {
        //     return {
        //         value: task.id,
        //         label: task.deskripsi
        //     }
        // });

        // taskList.unshift({ value: "", label: "Penugasan" });

        dispatch({
            type: INITIAL_STATE,
            payload: {
                listAbsensi: response.data.data.content,
                totalItems: response.data.data.totalElements,
                totalPage: response.data.data.totalPages,
                // taskList
            }
        });
    }
}

export const nextPrev = (page) => {
    return async (dispatch) => {
        const response = await HttpGet('api/v1/absensi/list?page=' + page + '&size=10');

        dispatch({
            type: INITIAL_STATE,
            payload: {
                listAbsensi: response.data.data.content,
                totalItems: response.data.data.totalElements,
                totalPage: response.data.data.totalPages,
            }
        });
    }
}

export const submit = ({ type, reason, task }) => {
    return async (dispatch) => {
        try {

            let payload = {
                type: type === 'Check In' ? "check_in" : "check_out",
                alasan: reason,
                penugasan: {
                    id: Number(task)
                }
            }

            await HttpPost('api/v1/absensi/save', payload);

            const userTask = await HttpGet('api/v1/absensi/list?page=0&size=10');

            dispatch({
                type: GET_USER_ABSESNCES,
                payload: {
                    listAbsensi: userTask.data.data.content,
                    totalItems: userTask.data.data.totalElements,
                    totalPage: userTask.data.data.totalPages,
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
}