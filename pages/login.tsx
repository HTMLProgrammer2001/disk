import React from 'react'
import {getCsrfToken, getProviders, getSession, SessionProvider} from 'next-auth/client'
import {Box, Container, Typography} from '@material-ui/core'
import {GetServerSideProps} from 'next';
import AuthLayout from '../layouts/AuthLayout';
import Providers from '../components/login/Providers';
import LoginForm from '../components/login/LoginForm';


type ISingInProps = {
	providers: Record<string, SessionProvider>
}

const Login: React.FC<ISingInProps> = ({providers}) => (
	<AuthLayout>
		<Container maxWidth="sm">
			<Typography component="h4" variant="h4" align="center">Login</Typography>

			<Box alignContent="center" justifyContent="center" marginTop={3}>
				<LoginForm/>
				<hr style={{margin: '1rem 0'}}/>
				<Providers providers={providers}/>
			</Box>
		</Container>
	</AuthLayout>
)

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {req, res} = ctx
	const session = await getSession({req})

	if (session && res && session.user) {
		res.writeHead(302, {Location: '/'}).end()
		return
	}

	return {
		props: {providers: await getProviders()}
	};
};
