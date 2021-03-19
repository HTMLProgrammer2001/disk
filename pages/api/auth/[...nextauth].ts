import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import {User} from '../../../models/User.model'
import {getDB} from '../../../models';


type ICredentials = {
	email?: string,
	password?: string
}

export default NextAuth({
	providers: [
		Providers.Credentials({
			id: 'email-and-password',
			name: 'Email and pass',
			credentials: {
				email: { label: "Email", type: "text"},
				password: {  label: "Password", type: "password" }
			},
			async authorize(credentials: ICredentials): Promise<any> {
				const {email, password} = credentials

				if(!email || !password)
					return null

				await getDB()
				const user = await User.findOne({where: {email}})

				if(!user)
					return null

				return user
			}
		})
	],
	jwt: {maxAge: parseInt(process.env.JWT_TIME) || 1000 * 60 * 60 * 24},
	session: {jwt: true},
	database: process.env.DB_URL,
	callbacks: {
		session: async (session, token: any) => {
			if(token.id)
				session.user = await User.findOne({where: {id: token.id}}) as any

			return Promise.resolve(session)
		},
		jwt: async (token, user) => {
			if(user)
				token.id = (user as any).id

			return Promise.resolve(token)
		}
	},
	secret: process.env.JWT_SECRET
})
