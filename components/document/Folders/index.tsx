import React from 'react'
import useSWR from 'swr'
import cn from 'classnames'
import {makeStyles} from '@material-ui/core'

import {FolderModel} from '../../../interfaces/Folder.model'


const useStyles = makeStyles({
	center: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
	list: {listStyle: 'none', padding: 0, margin: 0, width: '25%', borderRight: '1px solid #eee', height: '100%'},
	item: {
		padding: '.5rem',
		borderBottom: '1px solid #eee',
		textAlign: 'center',
		cursor: 'pointer'
	},
	active: {color: 'blue', background: '#eee'}
})

type IFoldersProps = {
	onFolderChange: (id: number) => void,
	currentFolderID: number
}

const Folders: React.FC<IFoldersProps> = ({onFolderChange, currentFolderID}) => {
	const {data, revalidate, error} = useSWR<{data: FolderModel[]}>('/api/folders', {refreshInterval: 500}),
		styles = useStyles()

	let content: any = <div className={styles.center}>No folders</div>

	if(!data)
		content = <div className={styles.center}>Loading...</div>
	else if(data.data.length)
		content = data.data.map(folder => (
			<li
				onClick={() => onFolderChange(folder.id)}
				className={cn(styles.item, {[styles.active]: folder.id == currentFolderID})}
			>{folder.name}</li>
		))

	return (
		<ul className={styles.list}>
			{content}
		</ul>
	);
}

export default Folders
