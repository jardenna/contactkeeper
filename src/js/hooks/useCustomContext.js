import { useContext } from 'react';

import ContactContext from '../context';

const useCustomContext = () => {
   return useContext(ContactContext);
};

export default useCustomContext;
