import {SessionProvider, signIn} from 'next-auth/client';
import {Box, Button} from '@material-ui/core';
import React from 'react';


type IProviderProps = {
	providers: Record<string, SessionProvider>
}

const Providers: React.FC<IProviderProps> = ({providers}) => (
	<Box display="flex" justifyContent="center">
		{providers && Object.values(providers).map((provider) => {
			if (provider.name === "Email and password")
				return;

			return (
				<Box key={provider.name}>
					<Button variant="contained" color="primary" onClick={() => signIn(provider.id)}>
						Login with {provider.name}
					</Button>
				</Box>
			);
		})}
	</Box>
)

export default Providers
