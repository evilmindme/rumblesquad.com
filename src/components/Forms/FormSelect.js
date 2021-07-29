import { useField } from 'formik';

export default function FormSelect({ label, ...props }) {
	const [field, meta] = useField(props);

	return (
		<div className={`f__field ${meta.touched && meta.error ? 'm-error' : ''}`}>
			<label 
				htmlFor={props.id || props.name}
				className="f__label"
			>
				{label}
				{props.isrequired && <div className="f__required">*</div>}
			</label>
			<select
				className="f__select"  
				{...field}
				{...props} />
			{meta.touched && meta.error ? (
				<div className="f__error">{meta.error}</div>
			) : null}
		</div>
	);
};