import {DataTypes, Model, Sequelize} from 'sequelize'

import {Folder} from './Folder.model';


export class File extends Model{}

export default (db: Sequelize) => {
	File.init({
		id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
		name: {type: DataTypes.STRING, allowNull: false},
		size: {type: DataTypes.INTEGER, defaultValue: 0},
		realName: {type: DataTypes.STRING, allowNull: false},
		type: {type: DataTypes.STRING, defaultValue: 'DOCUMENT'}
	}, {sequelize: db, modelName: 'File'})

	Folder.hasMany(File, {foreignKey: {name: "FolderId", allowNull: false}})
	File.belongsTo(Folder, {onDelete: "cascade"})
}
