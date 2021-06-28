import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {useSession} from 'next-auth/client'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react';


const useStyles = makeStyles({
	avatar: {
		width: '100px',
		height: '100px'
	}
})

type IProfileInfoProps = {
	edit(): void
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({edit}) => {
	const [session] = useSession(),
		styles = useStyles()

	return (
		<Box alignItems="center" display="flex" flexDirection="column" p={3}>
			<Avatar src={session.user.avatar} alt="Avatar" className={styles.avatar}/>
			<Box mt={3}>{session.user.name}</Box>
			<Box mb={3}>{session.user.email}</Box>

			<Box display="flex">
				<Button
					type="button"
					variant="contained"
					color="primary"
					onClick={edit}
					style={{marginRight: '1rem'}}
				>Update</Button>

				<form action="/api/delete">
					<Button
						type="submit"
						variant="contained"
						color="secondary"
					>
						Delete
					</Button>
				</form>
			</Box>
		</Box>
	)
}

export default ProfileInfo
