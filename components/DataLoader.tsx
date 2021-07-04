import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {CircularProgress} from '@material-ui/core';


const useStyles = makeStyles({
	center: {margin: 'auto'}
})

const DataLoader: React.FC = () => {
	const styles = useStyles()
	return <CircularProgress className={styles.center}/>
}

export default DataLoader
