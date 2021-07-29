import { useField } from 'formik';

export default function FormInput({ label, ...props }) {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);

	return (
		<>
			<div className={`f__field ${meta.touched && meta.error ? 'm-error' : ''}`}>
				<label 
					htmlFor={props.id || props.name}
					className="f__label"
				>
					{label}
					{props.isrequired && <div className="f__required">*</div>}
				</label>
				<input 
					className="f__input" 
					{...field}
					{...props}
				/>
				{meta.touched && meta.error ? (
					<div className="f__error">{meta.error}</div>
				) : null}
			</div>
		</>
	);
};