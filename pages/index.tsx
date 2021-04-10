import {getSession, useSession} from 'next-auth/client'
import {GetServerSideProps} from 'next'

import MainLayout from '../layouts/MainLayout'
import redirectLogin from '../utils/helpers/redirectLogin';
import requireAuth from '../utils/hoc/requireAuth';


const Home = () => {
	const [session] = useSession()

	return (
		<MainLayout>
			<div>Hi, {session.user.name}</div>
		</MainLayout>
	)
}

export default requireAuth(Home)

export const getInitialProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({req: ctx.req})

	if(!session?.user)
		redirectLogin(ctx)

	return {props: {}}
}
