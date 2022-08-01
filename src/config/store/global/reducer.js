import { INITIAL_STATE } from "./types";

const initiate = {
    isAuthenticated: true,
    isExpanded: false,
    user: {}
}

const GlobalReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default GlobalReducer;