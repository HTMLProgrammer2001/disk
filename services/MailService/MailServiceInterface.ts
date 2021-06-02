export interface MailServiceInterface {
	sendSignMessage(to: string, code: string): Promise<any>
}
