import ContentLoader from 'react-content-loader';

const ProductCardSkeleton = (props) => (
	<ContentLoader 
		speed={2}
		width={360}
		height={290}
		viewBox="0 0 360 290"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="506" y="233" rx="3" ry="3" width="178" height="6" /> 
		<rect x="0" y="0" rx="19" ry="19" width="320" height="165" /> 
		<rect x="12" y="178" rx="0" ry="0" width="150" height="24" /> 
		<rect x="12" y="214" rx="0" ry="0" width="250" height="20" />
	</ContentLoader>
);

export default ProductCardSkeleton;