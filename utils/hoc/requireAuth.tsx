import {useSession} from 'next-auth/client'

import Loader from '../../components/Loader'
import redirectLogin from '../helpers/redirectLogin'


const requireAuth = (Elem: any) => (props: any) => {
	const [session, loading] = useSession()

	if(!session && loading)
		return <Loader/>

	if(!loading && !session?.user?.id){
		redirectLogin()
		return
	}

	return <Elem {...props}/>
}

export default requireAuth
