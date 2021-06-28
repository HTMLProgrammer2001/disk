import {Sequelize} from 'sequelize'

import initUser from './User.model'
import initFolder from './Folder.model'
import initFile from './File.model'
import initAccess from './Access.model'


let db: Sequelize = null

export const initDB = async () => {
	db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		host: process.env.DB_HOST,
		dialect: 'postgres'
	})

	//init models
	initUser(db)
	initFolder(db)
	initFile(db)
	initAccess(db)

	await db.sync({alter: true})
	return db
}

export const getDB = async (): Promise<Sequelize> => db ? db : initDB()
export default db
