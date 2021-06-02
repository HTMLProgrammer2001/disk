import {Transporter} from 'nodemailer'
import * as mailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import AbortController from 'node-abort-controller'
global.AbortController = AbortController

import {MailServiceInterface} from './MailServiceInterface'


class MailGunService implements MailServiceInterface{
	private transporter: Transporter

	async connect(){
		this.transporter = mailer.createTransport(mg({
			auth: {
				apiKey: process.env.MAILGUN_KEY,
				domain: process.env.MAILGUN_DOMAIN,
			},
			host: 'api.eu.mailgun.net'
		}))
	}

	async sendSignMessage(to: string, code: string){
		const link = process.env.NEXTAUTH_URL + 'api/confirm?code=' + code
		let info = await this.transporter.sendMail({
			from: "Disk@gmail.com", // sender address
			subject: "Account creation",
			to,
			html: `Hi, visit this <a href="${link}">link</a> to finish your authorization`
		})

		console.log("Message sent: %s", info.messageId)
	}

	async send(config: any){
		let info = await this.transporter.sendMail({
			from: "LinkShorter@gmail.com", // sender address
			...config
		});

		console.log("Message sent: %s", info.messageId)
	}
}

const mail = new MailGunService()
mail.connect()

export default mail
