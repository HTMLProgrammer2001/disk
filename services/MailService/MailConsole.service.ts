import {MailServiceInterface} from './MailServiceInterface';

class MailConsoleService implements MailServiceInterface{
	async sendSignMessage(to: string, code: string) {
		console.log(`${to}:${code}`)
	}
}

export default new MailConsoleService()
