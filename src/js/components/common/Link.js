import React from 'react';
import PropTypes from 'prop-types';

function Link(props){
	return(
		<a
			target={props.target}
			href={props.href}
			rel={props.rel}
			title={props.title}>
			{props.text}
		</a>

	);
}
export default Link;

Link.propTypes ={
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	href:PropTypes.oneOfType([PropTypes.string, PropTypes.number])

};
