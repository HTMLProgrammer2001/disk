import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
	wrapper: {
		width: '100vw',
		height: '100vh',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	img: {
		borderRadius: '50%',
		width: '100px',
		height: '100px',
		background: '#00f',

		transformOrigin: 'center',
		animation: 'rotate 1s linear infinite'
	},
	circle: {
		position: 'absolute',
		top: 'calc(50% - 5px)',
		right: '1px',
		zIndex: 999,

		background: '#f00',
		borderRadius: '50%',

		animation: 'circle .75s linear infinite'
	},
	container: {
		position: 'relative'
	}
})

const Loader: React.FC = () => {
	const styles = useStyles()

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.circle}/>
				<img src="/logo.png" className={styles.img}/>
			</div>
		</div>
	)
}

export default Loader
