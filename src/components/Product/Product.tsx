import { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/products.interface';
import Headling from '../Headling';
import BackButton from '../BackButton';
import styles from './Product.module.css';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { cartActions } from '../../store/cart.slice';
import Skeletons from '../Skeletons';

const Product = () => {
	const data = useLoaderData() as { data: Product };
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((s: RootState) => s.cart.items);

	return (
		<Suspense
			fallback={<><Skeletons type="Product" /></>}
		>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => {

					if (!data || !data?.id) {
						return <>
							<div>
								<header className={styles['header']}>
									<div className={styles['header-row']}>
										<div>
											<BackButton />
										</div>
										<div className={styles['headling']}>
											<Headling>Товар не найден</Headling>
										</div>
									</div>
								</header>
							</div>
						</>;
					}

					const {
						id,
						image,
						ingredients,
						name,
						price,
						rating
					} = data;

					const add = (e: MouseEvent) => {
						e.preventDefault();
						dispatch(cartActions.add(id));
					};

					const item = items.find((i) => i.id === id);
					

					return (
						<>
							<div>
								<header className={styles['header']}>
									<div className={styles['header-row']}>
										<div>
											<BackButton />
										</div>
										<div className={styles['headling']}>
											<Headling>{ name }</Headling>
										</div>
										<div>
											<Button onClick={add}>
												<img src="/cart-button-icon.svg" alt="" /> <span>В корзину ({ item?.count || 0 })</span>
											</Button>
										</div>
									</div>
								</header>
								<div className={styles['info-wrapper']}>
									<div>
										<div className={styles['image']} style={{backgroundImage: `url(${image})`}}>
											
										</div>
									</div>
									<div>
										<div className={styles['info']}>
											<div className={styles['item']}>
												<span className={styles['item-name']}>Цена</span>
												<span className={styles['price']}>{ price } <span>₽</span></span>
											</div>
											<hr className={styles['hr']} />
											<div className={styles['item']}>
												<span className={styles['item-name']}>Рейтинг</span>
												<span className={styles['rating']}>
													<span>{ rating }</span>
													<span>
														<img src="/star-icon.svg" alt="" />
													</span>
												</span>
											</div>
											<div className={styles['info-content']}>
												{ ingredients && ingredients.length && (
													<>
														<p>Состав:</p>
														<ul>
															{ ingredients.map((i) => <li key={i}>{ i }</li>) }
														</ul>
													</>
												) || ''}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					);
				}}
			</Await>
		</Suspense>
	);
};

export default Product;