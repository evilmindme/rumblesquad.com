import { useField } from 'formik';

export default function FormCheckbox({ children, ...props }) {
	const [field, meta] = useField({ ...props, type: 'checkbox' });

	return (
		<div className={`f__field ${meta.touched && meta.error ? 'm-error' : ''}`}>
			<label className="f__label m-checkbox">
				<input className="f__checkbox" type="checkbox" {...field} {...props} />
			{children}
			</label>
			{meta.touched && meta.error ? (
				<div className="f__error">{meta.error}</div>
			) : null}
		</div>
	);
};
