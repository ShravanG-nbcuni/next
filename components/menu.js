import { useRouter } from 'next/router';
import styles from '../styles/Menu.module.css'
export const Menu = () => {
	const router = useRouter();
	return (
		<div className={styles.main}>
			<div onClick={() => router.push('/')}>Home</div>
			<div onClick={() => window.location.href = 'https://www.facebook.com/nbcuniversal'}>FaceBook</div>
		</div>
	);
}