import {Box, Button, CircularProgress, makeStyles, TextField, Typography} from '@material-ui/core'
import React, {useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import {getSession, useSession} from 'next-auth/client'
import axios from 'axios'
import {toast} from 'react-toastify'

import UserSessionContext from '../../utils/context/UserSessionContext'
import UpdateAvatar from './UpdateAvatar';


const useStyles = makeStyles({
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
	input: {width: '75%', marginBottom: '1rem'}
})

type IEditProfileForm = {
	edited(): void
}

const EditProfileForm: React.FC<IEditProfileForm> = ({edited}) => {
	const router = useRouter(),
		[session] = useSession(),
		{updateSession} = useContext(UserSessionContext),
		styles = useStyles(),

		[email, setEmail] = useState(session.user.email),
		[name, setName] = useState(session.user.name),
		[avatarFile, setAvatarFile] = useState<File>(null),
		[isLoading, setLoading] = useState(false),
		[error, setError] = useState('')

	const onSubmit = async (e) => {
			e.preventDefault()

			try {
				//start loading
				setLoading(true)

				//make api call
				const formData = new FormData()
				formData.set("name", name)
				formData.set("email", email)
				formData.set("avatar", avatarFile)

				const resp = await axios.post('/api/edit', formData)

				//update user object
				const newSession = await getSession()
				updateSession(newSession as any)

				//update ui
				toast.success(resp.data.message)
				edited()
			} catch (err) {
				setError(err.response?.data.message || err.message)
			} finally {
				setLoading(false)
			}
		};

	useEffect(() => {
		setError(router.query.error ? 'Incorrect email and/or password' : '')
	}, [router.query.error])

	return (
		<Box p={3}>
			<form className={styles.form} onSubmit={onSubmit}>
				<Typography color="error">{error}</Typography>
				<UpdateAvatar onAvatarChange={setAvatarFile}/>

				<TextField
					type="email" name="email" label="Email" value={email}
					className={styles.input} onChange={e => setEmail(e.target.value)}
				/>

				<TextField
					type="text" name="name" label="Name" value={name} required
					className={styles.input} onChange={e => setName(e.target.value)}
				/>

				<Box>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={isLoading}
						style={{marginRight: '1rem'}}
					>
						<span>Edit</span>
						{isLoading && <CircularProgress size={15} style={{marginLeft: '0.5rem'}}/>}
					</Button>

					<Button
						type="button"
						variant="contained"
						color="default"
						disabled={isLoading}
						onClick={edited}
					>
						Cancel
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default EditProfileForm
