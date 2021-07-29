import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import{ init } from 'emailjs-com';

import * as ROUTES from '../../constants/routes';

import Header from '../Header';
import Footer from '../Footer';

import Landing from '../Landing';
import MembershipForm from '../MembershipForm';

function App() {
	useEffect(() => {
		init(process.env.REACT_APP_EMAILJS_USER);
	}, [])

	return (
		<Router>
			<Header />
			<main className="container">
				<Route exact path={ROUTES.HOME}><Landing /></Route>
				<Route exact path={ROUTES.MEMBERSHIP}><MembershipForm /></Route>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
