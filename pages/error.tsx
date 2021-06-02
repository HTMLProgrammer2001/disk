import Error from 'next/error'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'


const ErrorPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({statusCode, message}) => (
	<Error statusCode={statusCode} title={message}/>
)

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
	return {props: {statusCode: query.statusCode || req.statusCode, message: query.msg}}
}

export default ErrorPage
