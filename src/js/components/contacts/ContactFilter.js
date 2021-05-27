import { useContext } from 'react';

import ContactContext from '../../context/contacts/ContactContext';

const ContactFilter = () => {
   const contactContext = useContext(ContactContext);

   const { filterContacts, clearFilter } = contactContext;

   const onChange = event => {
      const inputFiltering = event.target.value;
      if (inputFiltering !== '') {
         filterContacts(inputFiltering);
      } else {
         clearFilter();
      }
   };

   return (
      <form>
         <input type="text" placeholder="Filter Contacts..." onChange={onChange} />
      </form>
   );
};
export default ContactFilter;
