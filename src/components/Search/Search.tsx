import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Seach({ isValid = true, className, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input ref={ref} className={cn(styles['input'], className, {
				isValid: isValid
			})} { ...props } />
			<img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
		</div>
	);
});

export default Search;