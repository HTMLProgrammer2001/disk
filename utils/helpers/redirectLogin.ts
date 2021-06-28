import {GetServerSidePropsContext} from 'next'
import {useRouter} from 'next/router'
import {signIn} from 'next-auth/client';


const redirectLogin = (ctx: GetServerSidePropsContext = null) => {
	if(ctx?.req){
		const location = '/login?callbackUrl=' + ctx.req.url
		ctx.res.writeHead(302, {Location: location}).end()
	}
	else {
		signIn()
	}
}

export default redirectLogin
