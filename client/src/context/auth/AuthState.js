import React, {useReducer} from 'react';
import AuthContext from './authContext'
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCES,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOGOUT,
   CLEAR_ERRORS
} from'../types';
const AuthState=props=>{
    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    };
    const [state,dispatch]=useReducer(AuthReducer,initialState);
    const loadUser=async()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            
            const res=await axios.get('/api/auth');
            dispatch({type:USER_LOADED,payload:res.data});
        } catch (error) {
            dispatch({type:AUTH_ERROR})
        }
    }
    const login= async formData =>{
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const res=await axios.post('/api/auth',formData,config);
            dispatch({
                type:LOGIN_SUCCES,payload:res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,payload:error.response.data.msg
            });
        }
    }
    const logout = ()=>{
        dispatch({type:LOGOUT});
        console.log("logout");
    }
    const register = async formData=>{
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const res=await axios.post('/api/users',formData,config);
            dispatch({
                type:REGISTER_SUCCES,payload:res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL,payload:error.response.data.msg
            });
        }
    }
    const clearErrors=()=>dispatch({type:CLEAR_ERRORS});
    return (
        <AuthContext.Provider
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}>
             {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;