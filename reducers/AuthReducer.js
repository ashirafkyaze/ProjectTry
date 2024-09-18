import {
    FB_AUTH,
    GOOGLE_AUTH,
    GET_RESTAURANTS,
    LOG_OUT
} from "../actions/types";


const INITIAL_STATE = {
    user : null,
    userLatLong: null,
    restaurants: null
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FB_AUTH:
            return { ...state, user: actions.payload};
            
        case GOOGLE_AUTH:
            return { ...state, user: actions.payload };
            
        case GET_RESTAURANTS:
            return { 
                ...state, 
                restaurants: actions.payload.data.results , 
                userLatLong: actions.payload.focusedLocation,
                user : actions.payload.userInfo 
            };
            
        case LOG_OUT : 
        return INITIAL_STATE;
                
        default:
            return state;
    }
};