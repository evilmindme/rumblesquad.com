import {useLayoutEffect, useState} from "react";
import mapboxgl from 'mapbox-gl';
import  { dbGeoJson} from '../../firebase';

export default function useMapboxMap(containerRef) {
	const [mapData, setMapData] = useState(()=>{
		if (dbGeoJson) {
			dbGeoJson.once('value', (snapshot) => {
				const data = snapshot.val()
				setMapData(data);
			});
		} else {
			return {}
		}
	});

	const [marker, setMarker] = useState();
	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

	useLayoutEffect(() => {
		if (typeof mapData !== 'undefined' && mapData.features.length) {
			const map = new mapboxgl.Map({
				container: containerRef.current,
				style: 'mapbox://styles/catzill/ckqi6gwcd1jdp17nzwdmiea12',
				center: [ 30.5238, 35.45466 ],
				zoom: 2,
				scrollWheelZoom: false,
				scrollZoom: false
			});

			let mapNav = new mapboxgl.NavigationControl({
				showCompass: false,
				showZoom: true
			});
		
			map.addControl(mapNav, "bottom-right");

			mapData.features.map((location) => {
				const marker = new mapboxgl.Marker()
				.setLngLat(location.geometry.coordinates) //longitude and latitude
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }) // add popups
					.setHTML(
					'<h3>' +
						location.properties.description +
					'</h3>'
					)
				)
				.addTo(map);;
				return marker;
			});
			setMarker(marker)
			
		}
	}, [mapData, containerRef, marker]);
}