import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    darkMode: true,
    passwordUpdated: false,
    isDialogOpen: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
        setPasswordUpdated: (state, action) => {
            state.passwordUpdated = action.payload;
        },
        setIsDialogOpen: (state, action) => {
            state.isDialogOpen = action.payload;
        }
    },
});

export const { setDarkMode, setToken, setLoading, setPasswordUpdated, setIsDialogOpen } = userSlice.actions;
export default userSlice.reducer;
