import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../../components/Headling';
import { AppDispatch, RootState } from '../../../store';
import { useEffect, useState } from 'react';
import { Product } from '../../../interfaces/products.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/api';
import CartItem from '../../../components/CartItem';
import styles from './Cart.module.css';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../../store/cart.slice';
import Skeletons from '../../../components/Skeletons';

const DELIVERY_FREE = 169;

const Cart = () => {
	const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const total = items
		.map((i) => {
			const product = cartProducts.find(p => p.id === i.id);

			if (!product) {
				return 0;
			}

			return i.count * product.price;
		})
		.reduce((accumulator, currentValue) => {
			return accumulator += currentValue;
		}, 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
		setIsFirstRequest(false);
	};

	const checkout = async () => {
		try {
			await axios.post(`${PREFIX}/order`, {
				products: items
			}, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});

			dispatch(cartActions.clean());
			navigate('/success');
		} catch(e) {
			console.error(e);
		}
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	if (!items.length) {
		return (
			<>
				<Headling className={styles['headling']}>Корзина пуста</Headling>
			</>
		);
	}

	return (
		<>
			{
				isFirstRequest ? (
					<Skeletons type='Cart' />
				) : (
					<>
						<Headling className={styles['headling']}>Корзина</Headling>
						{ items && items.length && items.map((i) => {
							const product = cartProducts.find((p) => p.id === i.id);
			
							if (!product) {
								return;
							}
			
							return <CartItem key={ i.id } count={i.count} { ...product } />;
						}) || '' }
						<div className={styles['line']}>
							<div className={styles['text']}>Итог</div>
							<div className={styles['price']}>{ total }&nbsp;<span>₽</span></div>
						</div>
						<hr className={styles['hr']} />
						<div className={styles['line']}>
							<div className={styles['text']}>Доставка</div>
							<div className={styles['price']}>{DELIVERY_FREE}&nbsp;<span>₽</span></div>
						</div>
						<hr className={styles['hr']} />
						<div className={styles['line']}>
							<div className={styles['text']}>Итог <span className={styles['total-count']}>({items.length})</span></div>
							<div className={styles['price']}>{ total + DELIVERY_FREE }&nbsp;<span>₽</span></div>
						</div>
						<div className={styles['checkout']}>
							<Button appearance="big" onClick={checkout}>оформить</Button>
						</div>
					</>
				)
			}
		</>
	);
};

export default Cart;