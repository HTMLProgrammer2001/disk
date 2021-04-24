import {Box, Button, makeStyles, TextField, Typography} from '@material-ui/core'
import Link from 'next/link'
import React, {useState} from 'react'
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';


const useStyles = makeStyles({
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
	input: {width: '75%', marginBottom: '1rem'}
})

type ILoginFormProps = {
	token: string
}

const LoginForm: React.FC<ILoginFormProps> = ({token}) => {
	const styles = useStyles(),
		router = useRouter(),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState('')

	const onSubmit = (e: React.FormEvent) => {
		signIn('email-and-password', {email, password, callbackUrl: '/'})
		e.preventDefault()
	}

	return (
		<Box>
			<form className={styles.form} onSubmit={onSubmit}>
				<Typography color="error">{router.query.error ? 'Incorrect email and/or password' : ''}</Typography>
				<input name="csrfToken" type="hidden" defaultValue={token}/>

				<TextField
					type="email" name="email" label="Email"
					className={styles.input} onChange={e => setEmail(e.target.value)}
				/>

				<TextField
					type="password" name="password" label="Password"
					className={styles.input} onChange={e => setPassword(e.target.value)}
				/>

				<Button type="submit" variant="contained" color="primary">Login</Button>
				<Link href="/sign">Sign in</Link>
			</form>
		</Box>
	)
}

export default LoginForm
