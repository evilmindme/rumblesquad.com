// const requestImageFile = require.context('../../images/products/', true, /.png$/);
export default function ProductsListImage(props) {
	function importProductImages(imageModule) {
		let images = {};
		imageModule.keys().map(image => images[image.replace('./', '')] = imageModule(image).default);

		return images;
	}

	const imagesUse = importProductImages(require.context('../../images/products/', true, /\.(png|jpeg|svg)$/));
	const imagePath = `id${props.productID}/${props.productImage}`;

	return <>
		<img src={imagesUse[imagePath]} alt={props.productImage} />
	</>
}