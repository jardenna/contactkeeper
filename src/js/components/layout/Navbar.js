import { useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contacts/ContactContext';

const Navbar = ({ title }) => {
   const authContext = useContext(AuthContext);
   const contactContext = useContext(ContactContext);

   const { isAuthenticated, logout, user, loadUser } = authContext;
   const { clearContacts } = contactContext;
   useEffect(() => {
      if (isAuthenticated) {
         loadUser();
      }

   }, []);

   const onLogout = () => {
      logout();
      clearContacts();
   };

   const authLinks = (
      <Fragment>
         <li className="nav-item flex-item">
            Hello {user && user.name}
         </li>
         <li className="nav-item flex-item">
            <a href="#!" onClick={onLogout}>Logout</a>
         </li>
      </Fragment>
   );

   const guestLinks = (
      <Fragment>
         <li className="nav-item flex-item">
            <Link to='/register'>Register</Link>
         </li>
         <li className="nav-item flex-item">
            <Link to='/login'>Login</Link>
         </li>
      </Fragment>
   );

   return (
      <header className="main-header">
         <section className="flex-container container">
            <h1 className="flex-item">
               {title}
            </h1>
            <nav className="main-nav flex-3">
               <ul className="flex-container nav-wrapper">

                  {isAuthenticated ? authLinks : guestLinks}
                  <li className="nav-item flex-item">
                     <Link to='/about'>About</Link>
                  </li>
               </ul>
            </nav>
         </section>

      </header>

   );
};

export default Navbar;
