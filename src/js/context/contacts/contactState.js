import { useReducer } from 'react';
import axios from 'axios';

import contactReducer from './contactReducer';
import ContactContext from '../contacts/ContactContext';
import {
   ADD_CONTACT,
   GET_CONTACTS,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   CLEAR_CONTACTS,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   CONTACT_ERROR,
   CLEAR_ERRORS
} from './types';


import { contactUrl } from '../../utils/endpoints';

const ContactState = (props) => {
   const initialState = {
      contacts: [],
      error: null,
      current: null,
      filtered: null,
      loading: true
   };

   const [state, dispatch] = useReducer(contactReducer, initialState);


   // Get Contacts
   const getContacts = async () => {
      try {
         const res = await axios.get(contactUrl);

         dispatch({
            type: GET_CONTACTS,
            payload: res.data
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
         });
      }
   };


   // Add Contact
   const addContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post(contactUrl, contact, config);

         dispatch({
            type: ADD_CONTACT,
            payload: res.data
         });
      } catch (err) {

         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.data.errors
         });
      }
   };




   // Delete Contact
   const deleteContact = async id => {
      try {
         await axios.delete(contactUrl + id);

         dispatch({
            type: DELETE_CONTACT,
            payload: id
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
         });
      }
   };

   //Set Current Contact on click on edit btn

   const setCurrent = (contact) => {
      dispatch({
         type: SET_CURRENT,
         payload: contact

      });
   };

   // Clear Contacts
   const clearContacts = () => {
      dispatch({ type: CLEAR_CONTACTS });
   };

   const clearCurrent = () => {
      dispatch({
         type: CLEAR_CURRENT
      });
   };

   // Update Contact
   const updateContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.put(
            contactUrl + contact._id,
            contact,
            config
         );

         dispatch({
            type: UPDATE_CONTACT,
            payload: res.data
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
         });
      }
   };

   const filterContacts = (text) => {
      dispatch({
         type: FILTER_CONTACTS,
         payload: text
      });
   };

   const clearFilter = () => {
      dispatch({
         type: CLEAR_FILTER
      });
   };

   //Clear errors
   const clearErr = () => {
      dispatch({
         type: CLEAR_ERRORS
      });
   };

   const { contacts, current, filtered, error, loading } = state;
   return (
      <ContactContext.Provider
         value={{
            contacts,
            current,
            filtered,
            error,
            loading,
            addContact,
            getContacts,
            deleteContact,
            updateContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter,
            clearContacts,
            clearErr
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;