import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/client'
import connect from 'next-connect'

import {getDB} from '../../../models'
import {Folder} from '../../../models/Folder.model'


const handler = connect()
	.put(async (req: NextApiRequest, res: NextApiResponse) => {
		await  getDB()
		const {user} = await getSession({req})

		//show error if user is not signed in
		if (!user)
			return res.status(401).json({message: 'You are not logged in'})

		const folder = await Folder.findByPk(+req.query.id)

		if(!folder)
			res.status(404).json({message: 'Folder not found'})

		folder.set("name", req.body.newName)
		await folder.save()
		return res.status(200).json({data: folder})
	})

	.delete(async (req: NextApiRequest, res: NextApiResponse) => {
		await  getDB()
		const {user} = await getSession({req})

		//show error if user is not signed in
		if (!user)
			return res.status(401).json({message: 'You are not logged in'})

		const folder = await Folder.findByPk(+req.query.id)

		if(!folder)
			res.status(404).json({message: 'Folder not found'})

		await folder.destroy()
		return res.status(200).json({message: 'Folder deleted'})
	})

export default handler
