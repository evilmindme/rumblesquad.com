import {useContext, useState, useEffect} from 'react';
import  { FirebaseContext } from '../../firebase';
import Loader from '../../components/Loader';
import ProductsListImage from './ProductsListImage';



export default function ProductsList() {
	const productsDB = useContext(FirebaseContext);
	const productsRef = productsDB.database.ref('products/');
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState(() => {
		if (productsRef) {
			productsRef.once('value', (snapshot) => {
				const data = snapshot.val();
				setProducts(data);
				setIsLoading(false);
				console.log('prods1', products);
			});
		} else {
			return []
		}
		
	});
	const [images, setImages] = useState({});

	// function loadImage(id, imageName) {
	// 	import(`../../images/products/id${id}/${imageName}`).then(image => {
	// 		setImages(image);
	// 		console.log(image);
	// 	});
	// };

	console.log('prods', products);

	useEffect(() => {
		
	}, [])

	

	return (<>
		<section className="products__container">
			<h1 className="m-uppercase">Our merch</h1>
			{isLoading && <Loader />}
			<ul className="products__list">
				{!isLoading && products.map(product => {
					return <li 	
								className="product__item"
								key={product.id}>
									<div className="product__name">
										{product.name}
									</div>
									<div className="product__image">
										<ProductsListImage productID={product.id} productImage={product.images.image1} />
									</div>
									<div className="product__price">
										{product.price.standart}
									</div>
							</li>
				})}
			</ul>
		</section>
	</>)
}