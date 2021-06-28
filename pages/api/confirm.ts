import {NextApiHandler} from 'next'

import {getDB} from '../../models'
import {User} from '../../models/User.model'


const handler: NextApiHandler = async (req, res) => {
	await getDB()
	const {code} = req.query

	const errorURL = process.env.NEXTAUTH_URL + 'error';

	//validate
	if(!code) {
		res.redirect(errorURL + '?msg=' + encodeURIComponent("Code required") + '&statusCode=422')
		return
	}

	const user = await User.findOne({where: {code, isActive: false}})

	if(!user) {
		res.redirect(errorURL + '?msg=' + encodeURIComponent("Code invalid") + '&statusCode=422')
		return
	}

	//update user
	await user.update({code: null, isActive: true})
	res.redirect(process.env.NEXTAUTH_URL + 'login')
}

export default handler
