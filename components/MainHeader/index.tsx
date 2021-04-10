import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles';
import {useState} from 'react'
import {signIn, signOut, useSession} from 'next-auth/client'
import Link from 'next/link'


const useStyles = makeStyles({
	menuLink: {textTransform: 'none', color: 'black'}
})

const MainHeader: React.FC = () => {
	const [anchorElement, setAnchorElement] = useState<HTMLElement>(null),
		[session] = useSession(),
		styles = useStyles()

	const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorElement(e.currentTarget),
		handleClose = () => setAnchorElement(null),
		handleLogout = () => {
			signOut()
			signIn()
		}

	if (!session)
		return null

	const {user} = session

	return (
		<AppBar position="static">
			<Toolbar style={{justifyContent: 'space-between'}}>
				<Typography variant="h5">Disk</Typography>

				<div style={{display: 'flex'}}>
					<div>
						<Box color="white">{user.name}</Box>
						<Box color="white">{user.email}</Box>
					</div>

					<Avatar alt="Avatar" src={user.avatar} onClick={handleClick}/>
				</div>

				<Menu
					anchorEl={anchorElement}
					onClose={handleClose}
					open={!!anchorElement}
				>
					<Link href="/profile">
						<MenuItem>
							<div className={styles.menuLink}>Profile</div>
						</MenuItem>
					</Link>

					<Link href="/">
						<MenuItem>
							<div className={styles.menuLink}>Documents</div>
						</MenuItem>
					</Link>

					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}

export default MainHeader
