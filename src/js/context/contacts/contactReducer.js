import {
   ADD_CONTACT,
   GET_CONTACTS,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   CLEAR_CONTACTS,
   UPDATE_CONTACT,
   CONTACT_ERROR,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   CLEAR_ERRORS
} from './types';



export default (state, action) => {
   switch (action.type) {

      case GET_CONTACTS:
         return {
            ...state,
            contacts: action.payload,
            loading: false
         };
      case ADD_CONTACT:
         return {
            ...state,
            contacts: [action.payload, ...state.contacts],
            loading: false
         };

      case DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(contact => contact._id !== action.payload),
            loading: false
         };
      case SET_CURRENT:
         return {
            ...state,
            current: action.payload
         };
      case CLEAR_CONTACTS:
         return {
            ...state,
            contacts: [],
            filtered: null,
            error: null,
            current: null
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null
         };
      case CLEAR_ERRORS:
         return {
            ...state,
            error: null
         };
      case UPDATE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.map(contact => contact._id === action.payload._id ?
               action.payload : contact),
            loading: false
         };
      case CONTACT_ERROR:
         return {
            ...state,
            error: action.payload
         };
      case FILTER_CONTACTS:
         return {
            ...state,
            filtered: state.contacts.filter(contact => {
               return (
                  contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                  contact.email.toLowerCase().includes(action.payload.toLowerCase())
               );
            })
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null
         };
      default: return state;
   }
};
