import { useState } from 'react';
import { HOME } from '../../constants/routes';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import titleimg from '../../images/png/rumblesquad.png';
import Nav from '../Nav';
import Social from '../Social';

import { MobileOnlyView } from "react-device-detect";

export default function Header() {
	const [navActive, setNavActive] = useState(false);
	const $body = document.body;

	function handleNavClick(e) {
		e.preventDefault();
		$body.classList.add('nav-open');
		setNavActive(true);
	}

	function handleNavCloseClick(e) {
		e.preventDefault();
		$body.classList.remove('nav-open');
		setNavActive(false);
	}

	function handleOutsideClick(e) {
		e.preventDefault();

		const clickedOutside = e.target;
		if (clickedOutside.children[0]) {
			if (clickedOutside.children[0].classList.contains('open') && navActive) {
				handleNavCloseClick(e);
			}
		}
		
	}

	return <>
		<header className="header">
			<div className="header__wrapper" onClick={handleOutsideClick}>
				<Nav 
					navActive={navActive}
					handleNavCloseClick={handleNavCloseClick}
					
				/>
				<MobileOnlyView>
					<div 
						className="nav__hamburger icon-menu"
						onClick={(e) => handleNavClick(e)}
					></div>
				</MobileOnlyView>
				<div className="header__logo">
					<Link to={HOME} title="Rumblesquad MFC">
						<img src={titleimg} alt="Rumblesquad" className='header__title' />
						<img src={logo} alt="Rumblesquad" className='header__image' />
					</Link>
				</div>
				<Social />
			</div>
		</header>
	</>
}