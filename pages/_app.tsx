import React, {useState} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Provider} from 'next-auth/client'
import NProgress from 'nprogress'
import {ToastContainer} from 'react-toastify'

import theme from '../theme'
import wrapper from '../store/'
import UserSession from '../utils/context/UserSessionContext'

import 'nprogress/nprogress.css'
import 'react-toastify/scss/main.scss'
import '../styles/globals.css'


//bind events
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp(props) {
	const {Component, pageProps} = props
	const [session, setSession] = useState(pageProps.session)

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')

		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<Provider session={session}>
			<UserSession.Provider value={{session, updateSession: setSession}}>
				<Head>
					<title>My disk</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline/>
					<ToastContainer/>
					<Component {...pageProps} />
				</ThemeProvider>
			</UserSession.Provider>
		</Provider>
	)
}

export default wrapper.withRedux(MyApp)
