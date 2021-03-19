import {Button} from '@material-ui/core'
import {useSession, signIn, signOut} from 'next-auth/client'

import Loader from '../components/Loader'


const Home = () => {
	const [session, loading] = useSession()

	if(loading)
		return <Loader/>

	if(!session)
		return (
			<div>
				<b>You are not signed in</b>
				<Button variant="outlined" color="primary" onClick={signIn}>Sign in</Button>
			</div>
		)

	return (
		<div>
			<div>Hi, {session.user.name}</div>
			<Button variant="outlined" color="secondary" onClick={signOut}>Sign out</Button>
		</div>
	)
}

export default Home
