import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./Authentication";
import { appDataReducer } from "./appData";


export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        appData: appDataReducer,
    }
})