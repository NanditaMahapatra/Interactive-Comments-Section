import { configureStore } from "@reduxjs/toolkit";
import commentReducer from './rootReducer';
import {htmlReducer} from './rootReducer';
// console.log(htmlReducer)
const store = configureStore({
    reducer : {
        comment : commentReducer,
        buttonActions : htmlReducer
    }
});

export default store;