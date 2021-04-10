import {GetServerSidePropsContext} from 'next'
import {signIn} from 'next-auth/client';


const redirectLogin = (ctx: GetServerSidePropsContext = null) => {
	if(ctx?.req){
		const location = '/api/auth/sign?callbackUrl=' + ctx.req.url
		ctx.res.writeHead(302, {Location: location}).end()
	}
	else {
		signIn()
	}
}

export default redirectLogin
