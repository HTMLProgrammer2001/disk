import {Avatar, Box, Button, makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import {useSession} from 'next-auth/client'


const useStyles = makeStyles({
	avatar: {width: '100px', height: '100px', marginBottom: '1rem'}
})

type IUpdateAvatarProps = {
	onAvatarChange(file: File): void
}

const UpdateAvatar: React.FC<IUpdateAvatarProps> = ({onAvatarChange}) => {
	const styles = useStyles(),
		[session] = useSession(),
		[selectedURL, setSelectedURL] = useState('')

	const onChange = (e) => {
			onAvatarChange(e.target.files[0])
			setSelectedURL(URL.createObjectURL(e.target.files[0]))
		},
		onSelectClick = e => {
			if(selectedURL){
				setSelectedURL('')
				e.preventDefault()
				return
			}
		}

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Avatar src={selectedURL || session.user.avatar} alt="Avatar" className={styles.avatar}/>

			<label>
				<input type="file" accept="image/*" onChange={onChange} hidden/>

				<Button
					variant="contained"
					color="primary"
					component="span"
					onClick={onSelectClick}
				>
					{selectedURL ? 'Cancel' : 'Select'}
				</Button>
			</label>
		</Box>
	)
}

export default UpdateAvatar
