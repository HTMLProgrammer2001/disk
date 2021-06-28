import {NextApiHandler} from 'next'
import {getSession} from 'next-auth/client'

import {getDB} from '../../../models'
import {Folder} from '../../../models/Folder.model'
import {User} from '../../../models/User.model';


const handler: NextApiHandler = async (req, res) => {
	await getDB()
	const {user} = await getSession({req})

	const errorURL = process.env.NEXTAUTH_URL + 'error';

	//show error if user is not signed in
	if(!user) {
		res.redirect(errorURL + '?msg=' + encodeURIComponent("You are not logged in") + "&statusCode=403")
		return
	}

	const folders = await Folder.findAll({where: {owner: user.id}})
	res.status(200).json({data: folders})
}

export default handler
