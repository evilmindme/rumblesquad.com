import React, {useRef, useState} from 'react';
import useMapboxMap from '../../Hooks/Mapbox';
// import Members from '../Members';

export default function MapboxMap(props) {
	const [isFadedOut, setIsFadedOut] = useState(true);
	const mapRef = useRef();

	useMapboxMap(mapRef);

	function handleMapMouseEnter(e) {
		const mapBoxTarget = e.target;
		if (isFadedOut) {
			mapBoxTarget.classList.add('fadeOut');
			// mapBoxTarget.classList.remove('fadeIn');

			setTimeout(() => {
				setIsFadedOut(false);
			}, 50);
		}
	}

	function handleMapMouseLeave(e) {
		const mapBoxTarget = e.target;
		if (!isFadedOut) {
			// mapBoxTarget.classList.add('fadeIn');
			mapBoxTarget.classList.remove('fadeOut');
			setIsFadedOut(true);
		}
	}

	return (<>
		<section 
			className="mapbox__container"
			data-cover={isFadedOut}
			onMouseEnter={e => handleMapMouseEnter(e)} 
			onMouseLeave={e => handleMapMouseLeave(e)}
			id="map"
			ref={mapRef}>
		</section>
	</>)
}
