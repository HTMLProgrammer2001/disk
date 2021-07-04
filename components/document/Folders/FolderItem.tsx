import React, {useState} from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import LoopIcon from '@material-ui/icons/Loop'
import CancelIcon from '@material-ui/icons/Cancel'
import {TextField} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import {toast} from 'react-toastify'
import axios from 'axios'

import {FolderModel} from '../../../interfaces/Folder.model'

type IFolderItemProps = {
	folder: FolderModel,
	onEditStart: (id: number) => void,
	onEditCancel: () => void,
	savingChange: (isSaving: boolean) => void,
	isEditMode: boolean,
	disabled?: boolean
}

const FolderItem: React.FC<IFolderItemProps> = (props) => {
	const {folder, onEditStart, onEditCancel, isEditMode, savingChange, disabled = false} = props

	const [isDeleting, setDeleting] = useState(false),
		[editingValue, setEditingValue] = useState(''),
		[isEditing, setEditing] = useState(false)

	const startEdit = () => {
			//start editing and close all other inputs
			setEditingValue(folder.name)
			onEditStart(folder.id)
		},
		cancelEdit = () => onEditCancel(),
		prevent = (e: MouseEvent) => e.stopPropagation(),
		remove = async () => {
			setDeleting(true)

			//make api call for delete
			try {
				await axios.delete(`/api/folders/${folder.id}`)
			} catch (e) {
				toast.error(e.message)
			} finally {
				setDeleting(false)
			}
		},
		edit = async () => {
			//check input
			if (!editingValue) {
				toast.error('Name is required')
				return
			}

			//make api call
			setEditing(true)
			savingChange(true)

			try {
				await axios.put(`/api/folders/${folder.id}`, {newName: editingValue})
				cancelEdit()
			} catch (e) {
				toast.error(e.message)
			} finally {
				savingChange(false)
				setEditing(false)
			}
		},
		deleteClick = () => {
			if (isEditing)
				return

			if (isEditMode)
				cancelEdit()
			else
				remove()
		},
		editClick = () => {
			if (isDeleting)
				return

			if (!isEditMode)
				startEdit()
			else if (!isEditing)
				edit()
		}

	return (
		<div>
			{
				isEditMode ?
					<TextField
						disabled={isEditing}
						value={editingValue}
						onChange={e => setEditingValue(e.target.value)}
						placeholder="Folder name"
					/> :
					<span>{folder.name}</span>
			}

			<div onClick={prevent}>
				<IconButton disabled={isDeleting || disabled} onClick={editClick}>
					{!isEditMode ? <EditIcon/> : (isEditing ? <LoopIcon/> : <SaveIcon/>)}
				</IconButton>

				<IconButton onClick={deleteClick} disabled={isEditing}>
					{isDeleting ? <LoopIcon/> : (!isEditMode ? <DeleteIcon/> : <CancelIcon/>)}
				</IconButton>
			</div>
		</div>
	)
}

export default FolderItem
