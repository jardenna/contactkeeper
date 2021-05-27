import { Fragment } from 'react';


import Input from '@formElements/Input';
import TextArea from '@formElements/TextArea';
import Button from '@commonReact/Button';



function Form(props) {


	const { btnVaiant, btnText, onSubmit, className, inputs, onChange, onClearAll, current } = props;

	const btnClass = `btn-${btnVaiant ? btnVaiant : props.btnVaiant}`;

	return (
		<Fragment>

			<form onSubmit={onSubmit} noValidate className={className}>
				{
					inputs.map(input => {
						return (
							<Fragment key={input.inputIdentifier}>

								{input.type !== 'textarea' ? <Input
									type={input.type}
									name={input.name}
									value={input.value}
									inputIdentifier={input.inputIdentifier}
									label={input.label}
									isRequired={input.isRequired}
									error={input.error}
									previewClassName={input.previewClassName}
									onChange={onChange}
									checked={input.checked}
								/> :
									<TextArea
										name={input.name}
										value={input.value}
										inputIdentifier={input.inputIdentifier}
										label={input.label}
										isRequired={input.isRequired}
										error={input.error}

									/>
								}

							</Fragment>
						);
					})
				}

				<footer className="form-footer">
					<Button
						type='submit'
						className={btnClass}
						btnText={btnText}
					/>
					{current && <Button
						className={btnClass}
						btnText={'Clear'}
						onClick={onClearAll}
					/>}

				</footer>


			</form>


		</Fragment>

	);
}
export default Form;

