import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth";


export const signUp = (param) => async (dispatch) => {
    return authService.signUp(param)
    .then(async (res) => {
        console.log('resp at slice',res)
        // dispatch(setInputs(res?.data.response));
        // localStorage.setItem("token", res?.data?.response?.token)
        return res;
    })
        .catch((error) => {

            // dispatch(authSuccess(null));
            // localStorage.removeItem("token")
            throw error
        });
};
const initialState = {
    user:null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
});

export const {

} = userSlice.actions;

export default userSlice.reducer;
