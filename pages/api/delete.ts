import {NextApiHandler} from 'next'
import {getSession} from 'next-auth/client'

import {getDB} from '../../models'
import {User} from '../../models/User.model'


const handler: NextApiHandler = async (req, res) => {
	await getDB()
	const {user} = await getSession({req})

	const errorURL = process.env.NEXTAUTH_URL + 'error';

	//show error if user is not signed in
	if(!user) {
		res.redirect(errorURL + '?msg=' + encodeURIComponent("You are not logged in") + "&statusCode=403")
		return
	}

	//delete user
	const userModel = await User.findByPk(user.id);
	await userModel.destroy();

	res.redirect(process.env.NEXTAUTH_URL + 'login')
}

export default handler
