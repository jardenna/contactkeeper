import { useState, useContext, useEffect } from 'react';

import Form from '@formElements/Form';
import useCustomContext from '@hooks/useCustomContext';


import AuthContext from '../../context/auth/authContext';


const Register = (props) => {

   const initialState = {
      name: '',
      email: '',
      password: '',
      password2: ''
   };

   const alertContext = useCustomContext();
   const authContext = useContext(AuthContext);

   const { register, error, clearErr, isAuthenticated } = authContext;
   const { setAlert } = alertContext;


   const [user, setUser] = useState(initialState);

   const { name, email, password, password2 } = user;


   const emailErr = error && error.filter(a => a.param === 'email').map(b => b.msg);
   let userError = typeof error === 'string' ? error : emailErr;
   let passwordErr = error && error.filter(a => a.param === 'password').map(b => b.msg);
   let matchPasswords = password !== password2 && password2 !== '' ? 'Passwords do not match' : '';
   const inputs = [
      {
         type: 'text',
         name: 'name',
         placeholder: 'name',
         inputIdentifier: 'name',
         label: 'Name',
         isRequired: true,
         value: name

      },
      {
         type: 'email',
         name: 'email',
         inputIdentifier: 'email',
         placeholder: 'email',
         label: 'Email',
         isRequired: true,
         value: email,
         error: userError

      },

      {
         type: 'password',
         name: 'password',
         placeholder: 'password',
         inputIdentifier: 'password',
         label: 'Password',
         isRequired: true,
         value: password,
         error: passwordErr

      },

      {
         type: 'password2',
         name: 'password2',
         placeholder: 'Confirm password',
         inputIdentifier: 'password2',
         label: 'Confirm password',
         isRequired: true,
         value: password2,
         error: matchPasswords

      }

   ];


   useEffect(() => {

      if (isAuthenticated) {
         props.history.push('/');
      }



   }, [isAuthenticated, props.history]);

   const onChange = (e) => {
      const { name, value } = e.target;

      setUser({
         ...user,
         [name]: value
      });
   };


   const onSubmit = (e) => {
      e.preventDefault();

      if (name === '' || email === '' || password === '') {
         setAlert('Please enter all fields');
      } else {
         register({
            name, email, password
         });
      }

   };

   return (
      <div>
         <h1>Account Register</h1>
         <Form
            inputs={inputs}
            onChange={onChange}
            btnText={'Register'}
            onSubmit={onSubmit}
         />
      </div>
   );
};

export default Register;
