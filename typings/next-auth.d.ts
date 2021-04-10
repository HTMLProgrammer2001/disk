import * as NextAuth from 'next-auth'
import {UserModel} from '../interfaces/User.model'

declare module 'next-auth'{
	export interface User extends UserModel{}
}
