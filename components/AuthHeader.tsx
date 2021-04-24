import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'


const AuthHeader: React.FC = () => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h5">Disk</Typography>
		</Toolbar>
	</AppBar>
)

export default AuthHeader
