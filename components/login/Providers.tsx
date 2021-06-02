import {SessionProvider, signIn} from 'next-auth/client';
import {Box, Button} from '@material-ui/core';
import React from 'react';
import {useRouter} from 'next/router';


type IProviderProps = {
	providers: Record<string, SessionProvider>
}

const Providers: React.FC<IProviderProps> = ({providers}) => {
	const router = useRouter()
	const callback = router.query.callbackUrl?.toString() || '/'

	return (
		<Box display="flex" justifyContent="center">
			{providers && Object.values(providers).map((provider) => {
				if (provider.name === "Email and password")
					return;

				return (
					<Box key={provider.name}>
						<Button variant="contained" color="primary" onClick={() => {
							signIn(provider.id, {callbackUrl: callback})
						}}>
							Login with {provider.name}
						</Button>
					</Box>
				);
			})}
		</Box>
	)
}

export default Providers
