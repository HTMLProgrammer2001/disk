import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/client'
import {Box, Container, Typography} from '@material-ui/core'
import React, {useState} from 'react'

import AuthLayout from '../layouts/AuthLayout'
import SignForm from '../components/sign/SignForm';


const SignInPage: React.FC = () => {
	const [] = useState(false)

	return (
		<AuthLayout>
			<Container maxWidth="sm">
				<Typography component="h4" variant="h4" align="center">Sign in</Typography>

				<Box alignContent="center" justifyContent="center" marginTop={3}>
					<SignForm/>
				</Box>
			</Container>
		</AuthLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{}, {callbackUrl: string}> = async ({req, res, query}) => {
	const session = await getSession({req: req})
	const location = query.callbackUrl ? query.callbackUrl : '/'

	if (session && !session.user)
		res.writeHead(200, {Location: location}).end()

	return {props: {}}
}


export default SignInPage
