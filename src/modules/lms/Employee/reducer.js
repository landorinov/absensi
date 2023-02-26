import { GET_USER_ABSESNCES, INITIAL_STATE } from "./types";

const initiate = {
    reason: "",
    listAbsensi: [],
    userTaskLoading: true,
    totalItems: 0,
}

const AbsenceReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case GET_USER_ABSESNCES:
            return {
                ...state,
                listAbsensi: action.payload.listAbsensi,
                totalItems: action.payload.totalItems,
                userTaskLoading: false,
            };
        default:
            return state;
    }
}

export default AbsenceReducer;