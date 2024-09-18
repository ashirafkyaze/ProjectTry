const _ = require("lodash");

export default function reducer(
    state = {
        bookmarks: [],
        fetchingbookmarks: false,
        fetchedbookmarks: false,
        error: null
    }, action
) {
    switch (action.type) {
        case "FETCH_BOOKMARKS_STARTED": {
            return { ...state, fetchingbookmarks: true };
        }
        case "FETCH_BOOKMARKS_REJECTED": {
            return { ...state, fetchingbookmarks: false, error: action.payload };
        }
        case "FETCH_BOOKMARKS_FULLFILLED": {
            return { 
                ...state, 
                fetchingbookmarks: false, 
                fetchedbookmarks: true, 
                bookmarks: _.orderBy(action.payload, ["time"], ["desc"]),
                error:null

            };
        }
        default: {
            return state;
        }
    }
}