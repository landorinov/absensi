import { HttpGet } from "../../../config/api/service";
import { INITIAL_STATE } from "./types";


export const initialState = () => {
    return async (dispatch) => {
        const userTask = await HttpGet('api/v1/absensi/list?page=0&size=10');

        console.log(userTask.data.data);

        dispatch({
            type: INITIAL_STATE,
            payload: {
                userTasks: userTask.data.data.content,
                totalItems: userTask.data.data.totalElements,
                totalPage: userTask.data.data.totalPages
            }
        });
    }
}
