import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
	center: {display: 'flex', justifyContent: 'center', alignItems: 'center'}
})

const EmptyFolder: React.FC = () => {
	const styles = useStyles()
	return <div className={styles.center}>No folders</div>
}

export default EmptyFolder
