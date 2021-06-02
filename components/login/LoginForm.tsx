import {Box, Button, CircularProgress, makeStyles, TextField, Typography} from '@material-ui/core'
import Link from 'next/link'
import React, {useState} from 'react'
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';


const useStyles = makeStyles({
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
	input: {width: '75%', marginBottom: '1rem'}
})

const LoginForm: React.FC = () => {
	const styles = useStyles(),
		router = useRouter(),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),

		[isLoading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)
		const callback = router.query.callbackUrl?.toString() || '/'
		await signIn('email-and-password', {email, password, callbackUrl: callback})
		setLoading(false)
	}

	return (
		<Box>
			<form className={styles.form} onSubmit={onSubmit}>
				<Typography color="error">{router.query.error ? 'Incorrect email and/or password' : ''}</Typography>
				<TextField
					type="email" name="email" label="Email" value={email}
					className={styles.input} onChange={e => setEmail(e.target.value)}
				/>

				<TextField
					type="password" name="password" label="Password" value={password}
					className={styles.input} onChange={e => setPassword(e.target.value)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
				>
					<span style={{marginRight: '0.5rem'}}>Login</span>
					{isLoading && <CircularProgress size={15}/>}
				</Button>

				<Link href="/sign">Sign in</Link>
			</form>
		</Box>
	)
}

export default LoginForm
