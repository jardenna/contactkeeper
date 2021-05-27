import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../Common/svg/SearchIcon';
function Search({ onClick, onChange, value, placeholder, name, onToggleInput, classNameHidden }) {

   return (
      <form className="search">
         <SearchIcon
            onClick={onToggleInput}
         />
         <div className="input-wrapper">



            <div className={classNameHidden}>
               <input type="text"
                  placeholder={placeholder}
                  onChange={onChange}
                  value={value}
                  name={name}

               />

               <span onClick={() => onClick(name)}
                  className="icon-x"
               />
            </div>

         </div>
      </form>
   );
}

export default Search;


Search.propTypes = {


   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   onChange: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired,
   name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired

};
Search.defaultProps = {
   placeholder: ''

};