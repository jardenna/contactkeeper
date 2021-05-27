import React from 'react';
import PropTypes from 'prop-types';

function Label({ className, htmlFor, label, text, required }) {
   return (


      <label
         className={className}
         htmlFor={htmlFor}>
         {label} {required && <span className="required" />}
         {text}
      </label>

   );
}

export default Label;

Label.propTypes = {
   className: PropTypes.string,
   text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])

};

Label.defaultProps = {
   label: '',
   text: ''
};