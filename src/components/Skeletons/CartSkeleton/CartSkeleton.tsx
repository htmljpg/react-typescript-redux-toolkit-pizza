import ContentLoader from 'react-content-loader';

const CartSkeleton = (props) => (
	<ContentLoader 
		speed={2}
		width={1920}
		height={700}
		viewBox="0 0 1920 700"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="9" rx="0" ry="0" width="200" height="44" /> 
		<rect x="0" y="82" rx="20" ry="20" width="82" height="82" /> 
		<rect x="102" y="128" rx="0" ry="0" width="42" height="22" /> 
		<rect x="102" y="90" rx="0" ry="0" width="124" height="24" /> 
		<rect x="288" y="109" rx="0" ry="0" width="100" height="26" /> 
		<rect x="0" y="190" rx="20" ry="20" width="82" height="82" /> 
		<rect x="102" y="236" rx="0" ry="0" width="42" height="22" /> 
		<rect x="102" y="198" rx="0" ry="0" width="124" height="24" /> 
		<rect x="288" y="217" rx="0" ry="0" width="100" height="26" /> 
		<rect x="0" y="372" rx="0" ry="0" width="71" height="26" /> 
		<rect x="0" y="418" rx="0" ry="0" width="71" height="26" /> 
		<rect x="-1" y="464" rx="0" ry="0" width="71" height="26" /> 
		<rect x="311" y="372" rx="0" ry="0" width="71" height="26" /> 
		<rect x="311" y="418" rx="0" ry="0" width="71" height="26" /> 
		<rect x="310" y="464" rx="0" ry="0" width="71" height="26" /> 
		<rect x="95" y="523" rx="29" ry="29" width="207" height="60" />
	</ContentLoader>
);

export default CartSkeleton;