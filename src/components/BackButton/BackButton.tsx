import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<button className={styles['btn']} type="button" onClick={() => navigate(-1)}>
			<img className={styles['btn-icon']} src="/arrow-left-icon.svg" alt="arrow left" />
		</button>
	);
};

export default BackButton;