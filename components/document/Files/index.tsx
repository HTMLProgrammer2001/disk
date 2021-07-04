import React from 'react'
import {makeStyles} from '@material-ui/core'
import useSWR from 'swr';
import cn from 'classnames';


const useStyles = makeStyles({
	wrapper: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: '75%'},
})

const Files: React.FC<{ folderID: number }> = ({folderID}) => {
	const styles = useStyles(),
		{data, error} = useSWR('/api/files', {refreshInterval: 500})

	return (
		<div className={styles.wrapper}>
			{folderID ? `Files for ${folderID}` : 'Select folder'}
		</div>
	)
}

export default Files
