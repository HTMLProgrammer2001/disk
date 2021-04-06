import {Button} from '@material-ui/core'
import {useSession, signOut, getSession} from 'next-auth/client'

import Loader from '../components/Loader'
import MainLayout from '../layouts/MainLayout';
import {GetServerSideProps} from 'next';


const Home = () => {
	const [session, loading] = useSession()

	return (
		<MainLayout>
			{loading && <Loader/>}

			{!loading && <div>
				<div>Hi, {session.user.name}</div>
				<Button variant="outlined" color="secondary" onClick={() => signOut()}>Sign out</Button>
			</div>}
		</MainLayout>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {req, res} = ctx
	const session = await getSession({req})

	if(!session?.user)
		res.writeHead(302, {Location: '/sign'}).end()

	return {props: {}}
}
