import { Link } from 'react-router-dom';

export default function Social() {
	const socialObj = [
		{
			name: 'instagram',
			icon: 'icon-instagram',
			link: process.env.REACT_APP_INSTAGRAM_LINK
		},
		{
			name: 'facebook',
			icon: 'icon-facebook2',
			link: process.env.REACT_APP_FB_LINK
		}
	];

	return <>
		<div className="social">
			<ul className="social__list">
				{socialObj.map((social, i) => {
					return (
						<li
							key={i}
							className={`social__item m-${social.name}`} 
							title={social.name}
						>
							<Link 
								to={{pathname: social.link}}
								target="_blank"
								className={`social__link ${social.icon}`}
							>
								<span className="m-hidden">{social.name}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	</>
}