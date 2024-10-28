import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});
