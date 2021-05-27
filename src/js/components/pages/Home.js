import { useEffect, useContext } from 'react';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
   const authContext = useContext(AuthContext);

   const { loadUser } = authContext;
   useEffect(() => {
      loadUser();
   }, []);
   return (
      <article className="flex-container">
         <section className="flex-item">
            <ContactForm />
         </section>


         <section className="flex-item">
            <Contacts />
         </section>
      </article>
   );
};

export default Home;
