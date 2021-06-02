import {MailServiceInterface} from './MailServiceInterface';


class MailGunService implements MailServiceInterface{
	async sendSignMessage(to: string, code: string) {
	}
}

export default new MailGunService()
