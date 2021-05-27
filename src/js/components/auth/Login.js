import { useState, useContext, useEffect } from 'react';

import Form from '@formElements/Form';

import AuthContext from '../../context/auth/authContext';
import useCustomContext from '@hooks/useCustomContext';

const Login = (props) => {

   const initialState = {
      email: '',
      password: ''

   };

   const alertContext = useCustomContext();
   const authContext = useContext(AuthContext);

   const { login, error, clearErr, isAuthenticated } = authContext;
   const { setAlert } = alertContext;

   const [user, setUser] = useState(initialState);

   const { email, password } = user;

   const inputs = [

      {
         type: 'email',
         name: 'email',
         inputIdentifier: 'email',
         placeholder: 'email',
         label: 'Email',
         isRequired: true,
         value: email

      },

      {
         type: 'password',
         name: 'password',
         placeholder: 'password',
         inputIdentifier: 'password',
         label: 'Password',
         isRequired: true,
         value: password

      }

   ];


   useEffect(() => {

      if (isAuthenticated) {
         props.history.push('/');
      }
      if (error !== null) {
         setAlert(error);
         clearErr();
      }

   }, [error, isAuthenticated, props.history]);

   const onChange = (e) => {
      const { name, value } = e.target;

      setUser({
         ...user,
         [name]: value
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (email === '' || password === '') {
         setAlert('all fields must be filled out');
      } else {
         login({
            email,
            password
         });
      }
   };

   return (
      <div>
         <h1>Account Login</h1>
         <Form
            inputs={inputs}
            onChange={onChange}
            btnText={'Login'}
            onSubmit={onSubmit}
         />
      </div>
   );
};

export default Login;
