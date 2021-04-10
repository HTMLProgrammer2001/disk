import {useSession} from 'next-auth/client'

import Loader from '../../components/Loader'
import redirectLogin from '../helpers/redirectLogin'


const requireAuth = (Elem: any) => (props: any) => {
	const [session, loading] = useSession()

	if(!session && loading)
		return <Loader/>

	if(!session && !loading){
		redirectLogin()
		return
	}

	return <Elem {...props}/>
}

export default requireAuth
