import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/client'
import AuthLayout from '../layouts/AuthLayout';


const SignInPage: React.FC = () => {
	return (
		<AuthLayout>
			<div>Sign in</div>
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
