import React from 'react';
import { NavLink } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
import { MobileOnlyView } from "react-device-detect";
 
const Nav = (props) => <>
	<nav className={`nav ${props.navActive && 'open'}`}>
		<ul className="nav__list">
			<li className="nav__item">
				<NavLink exact activeClassName="active" to={ROUTES.HOME}>Home</NavLink>
			</li>
			<li className="nav__item">
				<NavLink exact activeClassName="active" to={ROUTES.MEMBERSHIP}>Membership</NavLink>
			</li>
		</ul>
		<MobileOnlyView>
			<button 
				className="m-btn-close"
				onClick={e => props.handleNavCloseClick(e)} 
				type="button">
			</button>
		</MobileOnlyView>
	</nav>
</>;
 
export default Nav;