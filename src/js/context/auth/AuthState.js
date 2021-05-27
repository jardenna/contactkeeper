import { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import { authUrl, userUrl } from '../../utils/endpoints';


import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS
} from './types';


const AuthState = (props) => {

   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: null,
      error: null
   };

   const [state, dispatch] = useReducer(authReducer, initialState);


   //Load user
   const loadUser = async () => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }
      try {
         const res = await axios.get(authUrl);
         dispatch({
            type: USER_LOADED,
            payload: res.data
         });
      } catch (e) {
         dispatch({ type: AUTH_ERROR });
      }
   };

   // Register User
   const register = async formData => {

      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post(userUrl, formData, config);

         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
         });

         loadUser();
      } catch (err) {

         dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.errors || err.response.data.msg
         });
      }
   };

   // Login User
   const login = async formData => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post(authUrl, formData, config);

         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
         });

         loadUser();
      } catch (err) {

         dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
         });
      }
   };
   //Logout
   const logout = () => {
      dispatch({
         type: LOGOUT
      });
   };

   //Clear errors
   const clearErr = () => {
      dispatch({
         type: CLEAR_ERRORS
      });
   };


   const { token, isAuthenticated, loading, user, error } = state;
   const initialValue = {
      token,
      isAuthenticated,
      loading,
      user,
      error,
      register,
      loadUser,
      login,
      logout,
      clearErr
   };

   return (
      <AuthContext.Provider value={initialValue}>
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
