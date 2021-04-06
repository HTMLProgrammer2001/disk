import {Button} from '@material-ui/core';
import {signIn} from 'next-auth/client';


const SignPage: React.FC = () => {
	return (
		<Button color="primary" onClick={() => signIn()}>Sign in</Button>
	);
};

export default SignPage;
