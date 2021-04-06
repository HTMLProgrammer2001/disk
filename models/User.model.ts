import {DataTypes, Model, Sequelize} from 'sequelize'


export class User extends Model{}

export default (db: Sequelize) => {
	User.init({
		id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
		email: {type: DataTypes.STRING, unique: true, allowNull: false},
		name: {type: DataTypes.STRING, allowNull: false},
		avatar: {type: DataTypes.STRING},
		isActive: {type: DataTypes.BOOLEAN, defaultValue: false},
		provider: {type: DataTypes.STRING},
		password: {type: DataTypes.STRING}
	}, {sequelize: db, modelName: 'User'})
}
