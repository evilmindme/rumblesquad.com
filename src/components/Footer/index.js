import React from 'react';
import {HOME} from '../../constants/routes';
import {Link} from 'react-router-dom';

export default function Footer() {
	const devLink = process.env.REACT_APP_LKDN_LINK;
	return <>
		<footer className="footer">
			<div className="footer__content">
				© All rights reserved.
				<Link to={HOME} className="footer__link">Rumble Squad MFC</Link>
				<div className="footer__dev">
					Created by 
					<Link 
						to={{pathname: devLink}}
						target="_blank"
						className="footer__link"
					>
						Alex
					</Link>
				</div>
			</div>
		</footer>
	</>
}