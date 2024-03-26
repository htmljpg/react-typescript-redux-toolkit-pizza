import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Headling from '../../../components/Headling';
import Search from '../../../components/Search';
import { PREFIX } from '../../../helpers/api';
import { Product } from '../../../interfaces/products.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList';
import Skeletons from '../../../components/Skeletons';

const Menu = () => {

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>('');
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(
				`${PREFIX}/products`,
				{
					params: {
						name
					}
				}
			);
			setIsLoading(false);
			setProducts(data);
		} catch(e) {
			console.log(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
		
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
			</div>
			<div>
				{ error && <>{ error }</> }
				{ isLoading && <div style={{ marginTop: 40 }}><Skeletons type='ProductCard' length={6} /></div> }
				{ !isLoading && (
					products.length > 0 ? (
						<MenuList products={products} />
					) : (
						<>Не найдено</>
					)
				) }
			</div>
		</>
	);
};

export default Menu;