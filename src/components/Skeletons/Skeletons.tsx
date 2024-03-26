import { ReactNode } from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import { SkeletonsProps } from './SkeletonsProps';
import ProductSkeleton from './ProductSkeleton';
import CartSkeleton from './CartSkeleton';

export interface ISkeletonItem {
    type: string;
    element: ReactNode
}

const Skeletons = (props: SkeletonsProps) => {

	const items: ISkeletonItem[] = [
		{
			type: 'ProductCard',
			element: <ProductCardSkeleton />
		},
		{
			type: 'Product',
			element: <ProductSkeleton />
		},
		{
			type: 'Cart',
			element: <CartSkeleton />
		}
	];
    
	const currentSkeleton = items.find((i) => i.type === props.type);

	return (
		[...Array(props.length || 1).keys()].map(() => currentSkeleton?.element)
	);
};

export default Skeletons;