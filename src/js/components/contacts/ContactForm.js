import { useState, useContext, useEffect, Fragment } from 'react';

import ContactContext from '../../context/contacts/ContactContext';

import Form from '@formElements/Form';

const ContactForm = () => {
   const initialState = {
      name: '',
      email: '',
      phone: '',
      type: 'personal'
   };

   const contactContext = useContext(ContactContext);

   const { addContact, current, clearCurrent, updateContact, error, clearErr } = contactContext;

   const [contact, setContact] = useState(initialState);
   const { name, email, phone, type } = contact;




   useEffect(() => {
      if (current) {
         setContact(current);
      } else {
         setContact(initialState);
      }


   }, [contactContext, current]);

   const onChange = (e) => {
      const { name, value } = e.target;
      setContact({
         ...contact,
         [name]: value
      });
   };

   const onSubmit = (e) => {


      e.preventDefault();
      if (error !== null) {
         clearErr();
      }

      if (!current) {
         addContact(contact);
      } else {
         updateContact(contact);
      }
      clearAll();

   };

   const clearAll = () => {
      clearCurrent();
   };

   let contactName = error && error.filter(a => a.param === 'name');

   let contactEmail = error && error.filter(a => a.param === 'email');

   let contactPhone = error && error.filter(a => a.param === 'phone');

   const inputs = [
      {
         type: 'text',
         name: 'name',
         placeholder: 'name',
         inputIdentifier: 'name',
         label: 'Name',
         isRequired: true,
         value: name,
         error: contactName && contactName[0].msg

      },
      {
         type: 'email',
         name: 'email',
         inputIdentifier: 'email',
         placeholder: 'email',
         label: 'Email',
         isRequired: true,
         value: email,
         error: contactEmail && contactEmail[0].msg

      },
      {
         type: 'text',
         name: 'phone',
         inputIdentifier: 'phone',
         placeholder: 'Phone',
         label: 'Phone',
         isRequired: true,
         value: phone,
         error: contactPhone && contactPhone[0].msg

      },

      {
         type: 'radio',
         name: 'type',
         inputIdentifier: 'personal',
         label: 'Personal',
         isRequired: false,
         value: 'personal',
         checked: type === 'personal'

      },

      {
         type: 'radio',
         name: 'type',
         inputIdentifier: 'professionel',
         label: 'Professionel',
         isRequired: false,
         value: 'professionel',
         checked: type === 'professionel'
      }

   ];


   return (

      <Fragment>
         <h2>{!current ? 'Add contact' : 'Edit contact'}</h2>
         <Form
            inputs={inputs}
            btnText={!current ? 'Add contact' : 'Edit contact'}
            onChange={onChange}
            onSubmit={onSubmit}
            onClearAll={clearAll}
            current={current}
            btnVaiant={'primary'}

         />
      </Fragment>



   );
};

export default ContactForm;
