import {GetServerSideProps} from 'next'
import {getSession, useSession} from 'next-auth/client'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'

import MainLayout from '../layouts/MainLayout'
import redirectLogin from '../utils/helpers/redirectLogin'
import requireAuth from '../utils/hoc/requireAuth'


const useStyles = makeStyles({
	avatar: {
		width: '100px',
		height: '100px'
	}
})

const ProfilePage: React.FC = () => {
	const [session] = useSession(),
		styles = useStyles()

	return (
		<MainLayout>
			<Box alignItems="center" display="flex" flexDirection="column" p={3}>
				<Avatar src={session.user.avatar} alt="Avatar" className={styles.avatar}/>
				<Box>{session.user.name}</Box>
				<Box>{session.user.email}</Box>
			</Box>
		</MainLayout>
	)
}

export default requireAuth(ProfilePage)

export const getInitialProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({req: ctx.req})

	if (!session || !session.user)
		redirectLogin(ctx)

	return {props: {}}
}
