import React from 'react';

import PrivateRoute from './routing/PrivateRoute';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from 'react-router-dom';

import ContactState from '../context/contacts/contactState';
import AuthState from '../context/auth/AuthState';
import AlertState from '../context/alert/AlertState';

import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';
import Home from './pages/Home';
import About from './pages/About';
import Register from '@components/auth/Register';
import Login from '@components/auth/Login';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
   setAuthToken(localStorage.token);
}
function App() {

   return (
      <React.StrictMode>
         <AuthState>
            <ContactState>
               <AlertState>
                  <Router>
                     <Navbar
                        title='Contact'
                     />
                     <div className="container">
                        <Alerts />
                        <Switch>
                           <PrivateRoute exact path='/' component={Home} />
                           <Route path='/about' component={About} />
                           <Route path='/register' component={Register} />
                           <Route path='/login' component={Login} />
                        </Switch>
                     </div>
                  </Router>
               </AlertState>
            </ContactState>
         </AuthState>
      </React.StrictMode>

   );
}

export default App;
