import {Box, Button, makeStyles, TextField, Typography, CircularProgress} from '@material-ui/core'
import React, {useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'


const useStyles = makeStyles({
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
	input: {width: '75%', marginBottom: '1rem'}
})

const SignForm: React.FC = () => {
	const styles = useStyles(),
		[email, setEmail] = useState(''),
		[name, setName] = useState(''),
		[password, setPassword] = useState(''),
		[confirmPassword, setConfirmPassword] = useState(''),
		[error, setError] = useState(''),

		[isLoading, setLoading] = useState(false)

	const reset = () => {
			setEmail("")
			setName("")
			setError("")
			setPassword("")
			setConfirmPassword("")
		},
		onSubmit = async (e: React.FormEvent) => {
			e.preventDefault()

			if (password != confirmPassword) {
				setError('Passwords not same')
				return
			}

			try {
				setLoading(true)
				const resp = await axios.post('/api/sign', {email, password, confirmPassword, name})
				toast.success(resp.data.message)
				reset()
			} catch (err) {
				setError(err.response?.data.message || err.message)
			} finally {
				setLoading(false)
			}
		}

	return (
		<Box>
			<form className={styles.form} onSubmit={onSubmit}>
				{error && <Typography color="error">{error}</Typography>}

				<TextField
					type="email" name="email" label="Email" value={email}
					className={styles.input} onChange={e => setEmail(e.target.value)} required
				/>

				<TextField
					type="text" name="userName" label="Name" value={name}
					className={styles.input} onChange={e => setName(e.target.value)} required
				/>

				<TextField
					type="password" name="password" label="Password" value={password}
					className={styles.input} onChange={e => setPassword(e.target.value)} required
				/>

				<TextField
					type="password" name="confirmPassword" label="Confirm password" value={confirmPassword}
					className={styles.input} onChange={e => setConfirmPassword(e.target.value)} required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
				>
					<span style={{marginRight: '.5rem'}}>Sign in</span>
					{isLoading && <CircularProgress size={15}/>}
				</Button>
			</form>
		</Box>
	)
}

export default SignForm
