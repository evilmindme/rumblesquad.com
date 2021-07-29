import { Link } from 'react-router-dom';
import { MEMBERSHIP } from '../../constants/routes';
import bannerImage from '../../images/banner/rumble_banner.jpg';

export default function Introduction() {
	return <>
		<section className="introduction__container clearfix">
			<div className="introduction__wrapper">
				<div className="introduction__title-box m-diagonal-box">
					<h2 className="introduction__title m-uppercase">
						We are the team
						<span className="m-hidden m-desktop-show">
							, we are fabulous
						</span>
					</h2>
				</div>
				<div className="introduction__description">
					<p>
						Rumble Squad MFC welcomes you. We are a community of people with different lifestyles, interests, and visions, who have at least one thing in common: whenever it’s possible we are hitting the road on a motorcycle, that’s how we roll, that's our way of exploring the world and enjoying life moments with every meter of the road covered. 
						It doesn't matter where you are from or what your life is like, we are welcoming anyone here, but if you live and feel the same way as we do - please feel free to join us. We have awesome merch to offer and lots of top-notch routes coming up soon.
					</p>
					<Link className='introduction__join-link' to={MEMBERSHIP}>
						<button className="btn btn__primary">JOIN US</button>
					</Link>
				</div>
			</div>
			<img 
				src={bannerImage}
				alt="banner"
				className="introduction__image"
				loading="lazy"
			/>
		</section>
	</>
}