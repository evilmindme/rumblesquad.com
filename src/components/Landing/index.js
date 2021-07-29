import {useState, useEffect} from 'react';
import MapboxMap from '../MapboxMap';
import Loader from '../../components/Loader';
import Introduction from '../Introduction';
import Members from '../Members';
// import ProductsList from '../ProductsList';
import InstagramFeed from '../InstagramFeed';

export default function Landing() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, [])

	return <>
		{isLoading && <Loader />}
		<Introduction />
		<Members />
		<MapboxMap loading={isLoading} />
		{/* <ProductsList /> */}
		<InstagramFeed />
	</>
}