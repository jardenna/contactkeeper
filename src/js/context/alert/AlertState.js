import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

import alertReducer from './alertReducer';
import AlertContext from '../../context';

const AlertState = (props) => {
   const initialState = [];

   const [state, dispatch] = useReducer(alertReducer, initialState);

   //Set alert

   const setAlert = (msg, type, timeout = 5000) => {
      const id = uuidv4();
      dispatch({
         type: SET_ALERT,
         payload: { msg, type, id }
      });

      setTimeout(() => {
         dispatch({
            type: REMOVE_ALERT,
            payload: id
         });
      }, timeout);

   };

   const value = {
      alerts: state,
      setAlert
   };


   return (
      <AlertContext.Provider value={value}>
         {props.children}
      </AlertContext.Provider>
   );
};

export default AlertState;
