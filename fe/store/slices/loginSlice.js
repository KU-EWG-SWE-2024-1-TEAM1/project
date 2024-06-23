import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, token } = action.payload;
            const name = email.split('@')[0];
            state.isLoggedIn = true;
            state.user = { email, name };
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', token);
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
            }
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
