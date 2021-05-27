import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	return (
		<button
			type={props.type}
			id={props.id}
			className={props.className}
			onClick={props.onClick}
		>{props.btnText}</button>

	);
}
export default Button;


Button.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
	btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onClick: PropTypes.func
};
Button.defaultProps = {
	className: 'btn-primary',
	type: 'button'
};