import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedIn: false,
    user: null,
}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            const email = action.payload.email;
            const name = email.split('@')[0];
            state.isLoggedIn = true;
            state.user = { name };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },

})




export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;