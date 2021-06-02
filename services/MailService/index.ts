import MailGunService from './MailGun.service'
import MailConsoleService from './MailConsole.service'

export default process.env.NODE_ENV == 'development' ?
	MailConsoleService : MailGunService
