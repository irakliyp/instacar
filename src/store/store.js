import {combineReducers, legacy_createStore as createStore} from "redux";
import {storiesReducer} from "./reducers/stories.reducer.js";
import {userReducer} from "./reducers/user.reducer.js";


const rootReducer = combineReducers({
    storiesReducer,
    userReducer
});

export const store = createStore(rootReducer);

window.gStore = store;
