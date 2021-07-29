import { createContext } from 'react';
import { useFormik } from 'formik';
 
 // Create empty context
const FormikContext = createContext({});
 
// Place all of what’s returned by useFormik into context
export const Formik = ({ children, ...props }) => {
	console.log('props', props);
	const formikStateAndHelpers = useFormik(props);

	

	return (
		<FormikContext.Provider value={formikStateAndHelpers}>
			{typeof children === 'function'
				? children(formikStateAndHelpers)
				: children}
		</FormikContext.Provider>
	);
};