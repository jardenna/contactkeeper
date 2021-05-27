import { useContext, Fragment, useEffect } from 'react';

import ContactContext from '../../context/contacts/ContactContext';
import Loader from '@commonReact/Loader';

import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';

const Contacts = () => {

   const contactContext = useContext(ContactContext);

   const { contacts, filtered, getContacts, loading } = contactContext;



   const filteredContacts = filtered ? filtered : contacts;
   const hasContacts = contacts.length !== 0 && !loading;
   const foundContacts = filtered && filtered.length === 0;

   useEffect(() => {
      getContacts();
   }, []);

   return (
      <Fragment>
         {loading && <Loader />}
         <ContactFilter />
         {
            hasContacts ?
               filteredContacts.map((contact) => <div className="card" key={contact._id}><ContactItem contact={contact} /></div>)
               : <h3>Please add a contact</h3>
         }
         {foundContacts && <h3>No contacts were found</h3>}
      </Fragment>
   );
};

export default Contacts;
