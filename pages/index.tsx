import {getSession} from 'next-auth/client'
import {GetServerSideProps} from 'next'
import {Box} from '@material-ui/core'
import {useState} from 'react'
import {useRouter} from 'next/router'

import MainLayout from '../layouts/MainLayout'
import redirectLogin from '../utils/helpers/redirectLogin'
import requireAuth from '../utils/hoc/requireAuth'
import Folders from '../components/document/Folders/'
import Files from '../components/document/Files'


const Home = () => {
	const router = useRouter(),
		[currentFolderID, setCurrentFolder] = useState<number>(+router.query.folder)

	const changeFolder = (id: number) => {
		if(currentFolderID == id){
			setCurrentFolder(null)
			router.push({query: {}})
		}
		else{
			setCurrentFolder(id)
			router.push({query: {folder: id}})
		}
	}

	return (
		<MainLayout>
			<Box display="flex" height="100%">
				<Folders onFolderChange={changeFolder} currentFolderID={currentFolderID}/>
				<Files folderID={currentFolderID}/>
			</Box>
		</MainLayout>
	)
}

export default requireAuth(Home)

export const getInitialProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({req: ctx.req})

	if (!session?.user)
		redirectLogin(ctx)

	return {props: {}}
}
