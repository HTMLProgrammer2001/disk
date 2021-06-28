import {DataTypes, Model, Sequelize} from 'sequelize'

import {Folder} from './Folder.model'
import {File} from './File.model'
import {User} from './User.model';


export class Access extends Model{}

export default (db: Sequelize) => {
	Access.init({
		id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
		type: {type: DataTypes.STRING, allowNull: false},
		link: {type: DataTypes.STRING, allowNull: true},
		canEdit: {type: DataTypes.BOOLEAN, defaultValue: false}
	}, {sequelize: db, modelName: 'Access'})

	//relations
	Access.belongsToMany(Folder, {through: 'Access_Folders'})
	Folder.belongsToMany(Access, {through: 'Access_Folders'})

	Access.belongsToMany(File, {through: 'Access_Files'})
	File.belongsToMany(Access, {through: 'Access_Files'})

	Access.belongsToMany(User, {through: 'Access_Users'})
	User.belongsToMany(Access, {through: 'Access_Users'})
}
