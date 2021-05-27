import React from 'react';

import useCustomContext from '@hooks/useCustomContext';

function TextArea(props) {
	const a = useCustomContext();
	return (

		<div className="input-wrapper">
			<textarea
				name={props.name}
				id={props.inputIdentifier}
				placeholder={props.placeholder}
				onChange={a.onChange}
				onFocus={props.onFocus}
				data-test='component-textarea'
				value={props.value !== null ? props.value : ''}
			/>
			<label className={props.value !== '' ? 'top' : ''} htmlFor={props.inputIdentifier}>{props.label}{props.isRequired && '*'}</label>
			{props.error}
		</div>

	);

}

export default TextArea;
