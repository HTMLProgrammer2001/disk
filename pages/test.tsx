import React from 'react'
import Link from 'next/link'
import {useSelector} from 'react-redux'


const TestPage: React.FC = () =>  {
	const val = useSelector((state: any) => state.val)

	return (
		<>
			<div>{val}</div>
			<Link href="/">Main</Link>
		</>
	)
}

export default TestPage
