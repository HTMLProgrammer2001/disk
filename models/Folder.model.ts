import {DataTypes, Model, Sequelize} from 'sequelize'

import {User} from './User.model'


export class Folder extends Model{}

export default (db: Sequelize) => {
	Folder.init({
		id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
		name: {type: DataTypes.STRING, allowNull: false},
		owner: {type: DataTypes.INTEGER, allowNull: false}
	}, {sequelize: db, modelName: 'Folder'})

	User.hasMany(Folder, {foreignKey: {name: "UserId", allowNull: false}})
	Folder.belongsTo(User, {foreignKey: 'owner', onDelete: "cascade"})
}
