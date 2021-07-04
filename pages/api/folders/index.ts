import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/client'
import connect from 'next-connect'

import {getDB} from '../../../models'
import {Folder} from '../../../models/Folder.model'


const handler = connect()
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		await getDB()
		const {user} = await getSession({req})

		//show error if user is not signed in
		if (!user)
			return res.status(401).json({message: 'You are not logged in'})

		const folders = await Folder.findAll({where: {owner: user.id}})
		res.status(200).json({data: folders})
	})

	.post(async (req: NextApiRequest, res: NextApiResponse) => {
		await getDB()
		const {user} = await getSession({req})

		//show error if user is not signed in
		if (!user)
			return res.status(401).json({message: 'You are not logged in'})

		const newFolder = Folder.create({name: req.body.name, owner: user.id, UserId: user.id})
		res.status(200).json({data: newFolder})
	})

export default handler
