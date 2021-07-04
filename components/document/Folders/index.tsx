import React, {useEffect, useState} from 'react'
import useSWR from 'swr'
import cn from 'classnames'
import {makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import LoopIcon from '@material-ui/icons/Loop'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import {toast} from 'react-toastify'

import {FolderModel} from '../../../interfaces/Folder.model'
import EmptyFolder from './EmptyFolder'
import DataLoader from '../../DataLoader'
import FolderItem from './FolderItem'
import axios from 'axios'


const useStyles = makeStyles({
	wrapper: {width: '25%'},
	center: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
	list: {listStyle: 'none', padding: '.5rem 0 0 0', margin: 0, borderRight: '1px solid #eee', height: '100%'},
	item: {
		padding: '.5rem',
		borderBottom: '1px solid #eee',
		textAlign: 'center',
		cursor: 'pointer',
		'&:hover': {background: '#eee'}
	},
	active: {color: 'blue', background: '#eee'},
	actions: {
		display: 'flex', justifyContent: 'center', alignItems: 'center',
		padding: '.5rem', cursor: 'pointer',
		'&:hover': {background: '#eee'}
	},
	disabled: {color: 'gray', background: '#eee'}
})

type IFoldersProps = {
	onFolderChange: (id: number) => void,
	currentFolderID: number
}

const Folders: React.FC<IFoldersProps> = ({onFolderChange, currentFolderID}) => {
	const {data, error} = useSWR<{ data: FolderModel[] }>('/api/folders', {refreshInterval: 500}),
		styles = useStyles(),
		[isAdding, setAdding] = useState(false),
		[addValue, setAddValue] = useState(''),
		[editID, setEditID] = useState(0),
		[isEditSaving, setEditSaving] = useState(false),
		[isAddSaving, setAddSaving] = useState(false)

	const resetAdd = () => {
			setAdding(false)
			setAddValue('')
		},
		addNew = () => {
			if (!isEditSaving) {
				setAdding(true)
				setEditID(0)
			}
		},
		cancelNew = () => resetAdd(),
		save = async () => {
			if (!addValue) {
				toast.error('Folder name is required')
				return
			}

			if (isAddSaving)
				return

			setAddSaving(true)

			try {
				await axios.post('/api/folders', {name: addValue})
				resetAdd()
			} catch (e) {
				toast.error(e.message)
			} finally {
				setAddSaving(false)
			}
		},
		onEditStart = (id: number) => {
			resetAdd()
			setEditID(id)
		}

	useEffect(() => {
		if (error)
			toast.error(error)
	}, [error])

	let content: any = <EmptyFolder/>

	if (!data)
		content = <DataLoader/>
	else if (data.data.length)
		content = data.data.map(folder => (
			<li
				key={folder.id}
				onClick={() => onFolderChange(folder.id)}
				className={cn(styles.item, {[styles.active]: folder.id == currentFolderID})}
			>
				<FolderItem
					folder={folder}
					isEditMode={editID == folder.id}
					onEditStart={onEditStart}
					onEditCancel={() => setEditID(0)}
					savingChange={setEditSaving}
					disabled={isAddSaving}
				/>
			</li>
		))

	return (
		<div className={styles.wrapper}>
			{
				!isAdding &&
				<div className={cn(styles.actions, {[styles.disabled]: isEditSaving})} onClick={addNew}>
					<AddIcon/>
					<span>Add new</span>
				</div>
			}

			<ul className={styles.list}>
				{
					isAdding &&
					<li className={styles.item}>
						<TextField
							placeholder="Folder name"
							value={addValue}
							onChange={e => setAddValue(e.target.value)}
						/>

						<div>
							<IconButton onClick={save}>
								{isAddSaving ? <LoopIcon/> : <SaveIcon/>}
							</IconButton>

							<IconButton onClick={cancelNew} disabled={isAddSaving}>
								<CancelIcon/>
							</IconButton>
						</div>
					</li>
				}

				{content}
			</ul>
		</div>
	);
}

export default Folders
