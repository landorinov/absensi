import { INITIAL_STATE, LOAD_MORE } from "./types";

const initiate = {
    userTasks: [],
    totalItems: 0,
    page: 0,
    totalPage: 0,
}

const HistoryReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case LOAD_MORE:
            action.payload.moreTasks.map((task) => {
                state.userTasks.push(task);
            });

            return {
                ...state,
                page: action.payload.page
            };
        default:
            return state;
    }
}

export default HistoryReducer;