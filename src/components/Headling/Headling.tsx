import { HeadlineProps } from './Headling.props';
import cn from 'classnames';
import styles from './Headling.module.css';

const Headling = ({ children, className, ...props }: HeadlineProps ) => {
	return <>
		<h1 className={cn(className, styles['h1'])} { ...props }>
			{ children }
		</h1>
	</>;
};

export default Headling;