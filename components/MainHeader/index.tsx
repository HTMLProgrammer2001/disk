import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from 'react';
import {useSession} from 'next-auth/client';


const MainHeader: React.FC = () => {
	const [anchorElement, setAnchorElement] = useState<HTMLElement>(null),
		[session] = useSession()

	const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorElement(e.currentTarget),
		handleClose = () => setAnchorElement(null)

	return (
		<AppBar position="static">
			<Toolbar style={{justifyContent: 'space-between'}}>
				<Typography variant="h5">Disk</Typography>

				<div onClick={handleClick}>
					<Avatar alt="Avatar" src={(session?.user as any)?.avatar}/>
				</div>

				<Menu
					anchorEl={anchorElement}
					onClose={handleClose}
					open={!!anchorElement}
				>
					<MenuItem>Profile</MenuItem>
					<MenuItem>My account</MenuItem>
					<MenuItem>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}

export default MainHeader
