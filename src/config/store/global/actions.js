import { HttpGet } from "../../api/service";
import { INITIAL_STATE } from "./types";

export const initiate = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');

            if (token) {
                let user = await HttpGet('api/user/detail-profile');

                dispatch({
                    type: INITIAL_STATE,
                    payload: {
                        isAuthenticated: true,
                        user: user.data.data
                    }
                });
            } else {
                dispatch({
                    type: INITIAL_STATE,
                    payload: {
                        isAuthenticated: false,
                        user: {}
                    }
                })
            }
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }
}

export const profileSave = (token) => {
    return async (dispatch) => {
        try {
            localStorage.setItem("accessToken", token);

            dispatch({
                type: INITIAL_STATE,
                payload: {
                    isAuthenticated: true,
                    user: {}
                }
            })
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }
}