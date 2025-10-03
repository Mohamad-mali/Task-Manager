const { DataTypes } = require('sequelize');

const sequelize = require('../util/dataBase');

const Task = sequelize.define('Task', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	decription: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Task;
