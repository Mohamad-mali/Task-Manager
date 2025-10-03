const { Sequelize } = require('sequelize');

const dataBaseName = 'task-manager';

const dataBaseUsername = 'root';

const dataBasePassword = '123456789';

const sequelize = new Sequelize(
	dataBaseName,
	dataBaseUsername,
	dataBasePassword,
	{ dialect: 'mysql', host: 'localhost' }
);

module.exports = sequelize;
