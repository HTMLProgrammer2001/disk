import AuthHeader from '../../components/AuthHeader'
import Footer from '../../components/Footer'
import styles from './styles.module.scss'


const AuthLayout: React.FC = ({children}) => (
	<div className={styles.wrapper}>
		<AuthHeader/>
		<main className={styles.main}>{children}</main>
		<Footer/>
	</div>
)

export default AuthLayout
