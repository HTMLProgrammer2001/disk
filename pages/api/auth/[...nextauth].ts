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

				//search user with this credentials
				await getDB()
				const user = await User.findOne({where: {email, password}})

				//incorrect data
				if(!user || !user.getDataValue("isActive"))
					return null

				return user
			}
		}),
		Providers.Google({
			name: 'Google',
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	jwt: {maxAge: parseInt(process.env.JWT_TIME) || 10000000 * 60 * 60 * 24},
	session: {jwt: true},
	database: process.env.DB_URL,
	callbacks: {
		signIn: async (user, account, profile) => {
			//allow to sign in only verified accounts
			if(account.provider == 'google')
				return profile.verified_email

			return true
		},
		session: async (session, token: any) => {
			//set user to session
			if(token.id) {
				await getDB()
				let user: any = await User.findOne({where: {id: token.id}})
				session.user = user || {}
			}

			return session
		},
		jwt: async (token, user, account, profile) => {
			if(account?.provider == 'google'){
				await getDB()
				let userModel: User = await User.findOne({where: {email: profile.email}})

				if(!userModel)
					userModel = await User.create({
						email: profile.email,
						name: profile.name,
						avatar: profile.picture,
						isActive: true,
						provider: 'google'
					})

				token.id = userModel.getDataValue('id')
			}
			else if(user)
				token.id = (user as any).id

			return token
		}
	},
	secret: process.env.JWT_SECRET
})
