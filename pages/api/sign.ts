import connect from 'next-connect'
import {NextApiRequest, NextApiResponse} from 'next'

import {getDB} from '../../models'
import {User} from '../../models/User.model'
import generateCode from '../../utils/helpers/generateCode'
import MailService from '../../services/MailService/'


export default connect().post(async (req: NextApiRequest, res: NextApiResponse) => {
	await getDB()

	const {email, name, password, confirmPassword} = req.body,
		user = await User.findOne({where: {email}})

	//validate
	if(password != confirmPassword)
		return res.status(422).json({message: 'Passwords not same'})

	if(user)
		return res.status(422).json({message: 'User with this email already registered'})

	//create code
	const code = generateCode()

	//create user
	await User.create({email, password, name, code})

	//send mail
	await MailService.sendSignMessage(email, code)

	res.status(200).json({message: 'Mail with instructions was sent on your email'})
})
