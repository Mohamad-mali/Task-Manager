const { Sequelize } = require('sequelize');

//ONLY EDIT THE THREE VARIABLES

const dataBaseName = 'task-manager';
// add you data base name instead of the task-manager

const dataBaseUsername = 'root';
// data base username, this option can be viewed in MySQL work bench

const dataBasePassword = '123456789';
// Data password that was give to the database in installation

// DO NOT TOUCH THE CODE HERE
const sequelize = new Sequelize(
	dataBaseName,
	dataBaseUsername,
	dataBasePassword,
	{ dialect: 'mysql', host: 'localhost' }
);

module.exports = sequelize;
