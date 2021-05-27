import React from 'react';
import PropTypes from 'prop-types';

function MenuBurger({ onClick }) {
   return (
      <div className="menu-btn-wrapper" onClick={onClick}>
         <span className="menu-btn" >
            <span className="menu-btn-burger" />
         </span>
      </div>
   );
}

export default MenuBurger;

MenuBurger.propTypes = {
   onClick: PropTypes.func.isRequired
};