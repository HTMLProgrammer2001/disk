import {NextApiRequest, NextApiResponse} from 'next'
import connect from 'next-connect'
import {getSession} from 'next-auth/client'
import formidable, {File} from 'formidable'

import redirectLogin from '../../utils/helpers/redirectLogin'
import {User} from '../../models/User.model'
import {getDB} from '../../models';


export const config = {
	api: {
		bodyParser: false
	}
}

const handler = connect().post(async (req: NextApiRequest, res: NextApiResponse) => {
	const form = new formidable.IncomingForm();
	(form as any).uploadDir = './public';
	(form as any).keepExtensions = true

	form.parse(req, async (err, fields, files) => {
		const {name, email} = fields,
			session = await getSession({req})

		await getDB()

		//validate
		if(!session.user)
			return redirectLogin({req, res} as any)

		//update
		const userModel = await User.findOne({where: {email: session.user.email}})

		//parse avatar
		let avatar = userModel.getDataValue('avatar')
		if(files.avatar) {
			const name = (files.avatar as File).path.split(/[\\\/]/).pop()
			avatar = process.env.NEXTAUTH_URL + name
		}

		await userModel.update({email, name, avatar})
		return res.json({message: 'User edited'})
	})
})

export default handler
