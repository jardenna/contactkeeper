import { useContext } from 'react';

import ContactContext from '../../context/contacts/ContactContext';

const ContactItem = ({ contact }) => {
   const { _id, name, email, phone, type } = contact;

   String.prototype.capitalizeFirstLetter = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
   };
   const contactContext = useContext(ContactContext);
   const { deleteContact, setCurrent, clearCurrent } = contactContext;

   const onDelete = () => {
      deleteContact(_id);
      clearCurrent();
   };
   return (
      <div className="card-content">
         <div className="flex-container">
            <span className="flex-item text-bold"> {name}</span>  <span className={`flex-item badge badge-${type === 'professionel' ? 'primary' : 'success'}`}>
               {type.capitalizeFirstLetter()}
            </span>

         </div>


         <ul>
            <li>{email && email}</li>
            <li>{phone && phone}</li>
         </ul>
         <footer className="card-footer">
            <button className="btn-primary" onClick={() => setCurrent(contact)}>Edit</button>
            <button className="btn-danger" onClick={onDelete}>Delete</button>
         </footer>


      </div>
   );
};

export default ContactItem;


