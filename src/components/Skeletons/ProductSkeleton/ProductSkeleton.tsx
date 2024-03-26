import ContentLoader from 'react-content-loader';

const ProductSkeleton = (props) => (
	<ContentLoader 
		speed={2}
		width={1920}
		height={500}
		viewBox="0 0 1920 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="13" rx="12" ry="12" width="38" height="38" /> 
		<rect x="74" y="9" rx="0" ry="0" width="200" height="44" /> 
		<rect x="0" y="84" rx="18" ry="18" width="323" height="248" /> 
		<rect x="371" y="84" rx="0" ry="0" width="100" height="26" /> 
		<rect x="371" y="126" rx="0" ry="0" width="100" height="26" /> 
		<rect x="499" y="84" rx="0" ry="0" width="100" height="26" /> 
		<rect x="499" y="126" rx="0" ry="0" width="100" height="26" /> 
		<rect x="371" y="177" rx="0" ry="0" width="200" height="120" /> 
	</ContentLoader>
);

export default ProductSkeleton;