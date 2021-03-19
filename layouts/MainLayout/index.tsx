import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import styles from './styles.module.scss';


const MainLayout: React.FC = ({children}) => (
	<div className={styles.wrapper}>
		<MainHeader/>
		<main className={styles.main}>{children}</main>
		<Footer/>
	</div>
);

export default MainLayout;
