// import { useState } from 'react';
import { Formik, Form} from 'formik';
import emailjs from 'emailjs-com';
import useFetch from '../../Hooks/useFetch'
import FormInput from '../Forms/FormInput';
import FormSelect from '../Forms/FormSelect';
import FormTextarea from '../Forms/FormTextarea';
import FormCheckbox from '../Forms/FormCheckbox';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Loader from '../Loader';

export default function MembershipForm() {
	const [countries, setCountries] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [formSubmitted, setFormSubmitted] = useState(false);
	// https://restcountries.com/ URL to check API version
	const {get} = useFetch('https://restcountries.com/v3/');

	useEffect(() => {
		get('all?fields=name,capital')
			.then(data => {
				const dataToArray = Object.keys(data).map((key) => data[key].name);
				setCountries(dataToArray.sort((a, b) => a.common.localeCompare(b.common)));
				setIsLoading(false);
			})
			.catch(error => {
				console.log(error);
			})
	}, [])

	const defaultInputs = { 
		realname: '',
		nickname: '',
		bike: '',
		email: '',
		country: '',
		usermessage: '',
		acceptedTerms: false
	}

	const validationObj = Yup.object({
		realname: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Required'),
		nickname: Yup.string()
			.max(30, 'Must be 30 characters or less'),
		bike: Yup.string()
			.max(50, 'Must be 50 characters or less')
			.required('Required'),
		email: Yup.string().email('Invalid email address').required('Required'),
		country: Yup.string().default(null).nullable().required('Required').test(
			value => value === null || value,
		),
		acceptedTerms: Yup.boolean()
			.oneOf([true], " ")
			.required('Required'),
	});

	return <>
		<section className="membership__container">
			<h1 className="m-uppercase">Apply for membership</h1>
			<div className="membership__form-intro">
				<p>We are not offering anything extraordinary here except joining a community to travel on two wheels together with like minds from various countries, or to have a pint or maybe 5, if we will be around your area or you will be around ours. Don't hesitate to drop us a line or ask anything. We welcome anyone to join our Instagram and FB community.</p>
				<p>Additionally, If you're willing to support us - we have good-looking, high-quality merch available.</p>
			</div>
			{isLoading && <Loader />}
			{!isLoading && <Formik
				initialValues={defaultInputs}
				validationSchema={validationObj}
				onSubmit={(values, { resetForm, setSubmitting }) => {
					setTimeout(() => {
						// alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
						emailjs.send('service_yqho404', process.env.REACT_APP_EMAILJS_TEMPLATE, values);
						setFormSubmitted(true);
						setTimeout(() => {
							setFormSubmitted(false);
							resetForm();
						}, 4000)
					}, 400);
				}}
			>
				{formik => (
					<Form 
						className="membership__form f__form"
						id="membershipForm">

						<FormInput
							label="Your real name"
							name="realname"
							type="text"
							id="realName"
							placeholder="Obi Van Kenobi"
							isrequired='true'
						/>

						<FormInput
							label="Nickname"
							name="nickname"
							type="text"
							id="nickname"
							placeholder="Yoda"
						/>

						<FormInput
							label="Your bike"
							name="bike"
							type="text"
							id="bike"
							placeholder="Yamaha Dragstar 1100 2007"
							isrequired='true'
						/>

						<FormInput
							label="Email Address"
							name="email"
							type="email"
							id="email"
							placeholder="mighty_jedi@anymail.com"
							isrequired='true'
						/>
						
						<FormSelect 
							label="Select your country"
							name="country"
							id="country"
							isrequired='true'
						>
							<option value="">Select country...</option>
							{
								countries.map((country, i) => {
									return <option value={country.common} key={country.common}>{country.common}</option>
								})
							}
						</FormSelect>

						<FormTextarea
							label="Enter your message"
							name="usermessage"
							id="userMessage"
							rows='3'
						>
						</FormTextarea>
						<FormCheckbox 
							name="acceptedTerms"
							isrequired='true'
						>
							<div className="f__checkbox-data">Your data will never be used to spam or harm you in any way.</div>
						</FormCheckbox>
						<button className="btn btn__primary" type="submit">Submit</button>
					</Form>
				)}
			</Formik>}
			{formSubmitted && <div>The form has been submitted. We will reach you in a while.</div>}
		</section> 
	</>;
}