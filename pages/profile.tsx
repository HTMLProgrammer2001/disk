import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/client'
import React, {useState} from 'react'

import redirectLogin from '../utils/helpers/redirectLogin'
import requireAuth from '../utils/hoc/requireAuth'
import ProfileInfo from '../components/profile/ProfileInfo'
import EditProfileForm from '../components/profile/EditProfileForm'
import MainLayout from '../layouts/MainLayout'


const ProfilePage: React.FC = () => {
	const [isEdit, setEdit] = useState(false)

	return (
		<MainLayout>
			{!isEdit ?
				<ProfileInfo edit={() => setEdit(true)}/> :
				<EditProfileForm edited={() => setEdit(false)}/>}
		</MainLayout>
	)
}

export default requireAuth(ProfilePage)

export const getInitialProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({req: ctx.req})

	if (!session || !session.user)
		redirectLogin(ctx)

	return {props: {}}
}
