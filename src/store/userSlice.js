import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth";



export const signUp = (param) => async (dispatch) => {
    return authService.signUp(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            localStorage.setItem("token", res?.data?.response?.token)
            let userData = res?.data?.response?.user || {}
            dispatch(setUser({...userData,token:res?.data?.response?.token || null}))
            return res;
        })
        .catch((error) => {

            // dispatch(authSuccess(null));
            localStorage.removeItem("token")
            throw error
        });
};

export const login = (param) => async (dispatch) => {
    return authService.login(param)
        .then(async (res) => {
            console.log('resp at login', res)
            // localStorage.setItem("token", res?.data?.response?.token)
            // dispatch(setProfile(res?.data?.response?.profile || {}))
            // let userData = res?.data?.response?.user || {}
            // dispatch(setUser({...userData,token:res?.data?.response?.token || null}))
            return res;
        })
        .catch((error) => {

            localStorage.removeItem("token")
            throw error
        });
};

export const logout = () => async (dispatch) => {
    return authService.logout()
        .then(async (res) => {
            window.localStorage.clear();
            dispatch(setProfile({}))
            dispatch(setUser({}))
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const addTaxfile = (param) => async (dispatch) => {
    return authService.addTaxfile(param)
        .then(async (res) => {
            console.log('resp at slice', res)
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

export const updateTaxfile = (param) => async (dispatch) => {
    return authService.updateTaxfile(param)
        .then(async (res) => {
            console.log('resp at slice', res)
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

export const addClientMsg = (param) => async (dispatch) => {
    return authService.addClientMsg(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            
            return res;
        })
        .catch((error) => {
            throw error
        });
};

// export const getClientMsg = (param) => async (dispatch) => {
//     return authService.getClientMsg(param)
//         .then(async (res) => {
//             console.log('resp at slice', res)
            
//             return res;
//         })
//         .catch((error) => {
            
//             throw error
//         });
// };

export const verifyEmail = (param,user) => async (dispatch) => {
    return authService.verifyEmail(param)
        .then(async (res) => {
            localStorage.setItem("token", res?.data?.response?.token)
            let userData = res?.data?.response?.user || {}
            dispatch(setUser({...userData,token:res?.data?.response?.token || null}))
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const verifyLogin = (param) => async (dispatch) => {
    return authService.verifyLogin(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            localStorage.setItem("token", res?.data?.response?.token)
            let userData = res?.data?.response?.user || {}
            dispatch(setUser({...userData,token:res?.data?.response?.token || null}))
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const forgotPassword = (param) => async (dispatch) => {
    return authService.forgotPassword(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const setNewPassword = (param) => async (dispatch) => {
    return authService.setNewPassword(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const updatePassword = (param) => async (dispatch) => {
    return authService.updatePassword(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            return res;
        })
        .catch((error) => {
            throw error
        });
};

export const sendSpouseInvitation = (param) => async (dispatch) => {
    return authService.sendSpouseInvitation(param)
        .then(async (res) => {
            console.log('resp at slice', res)
            return res;
        })
        .catch((error) => {
            throw error
        });
};

const initialState = {
    user: {},
    profile:{}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
    }
});

export const {
setProfile,
setUser
} = userSlice.actions;

export default userSlice.reducer;
