// const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
	const userInfo = sequelize.define("userInfo", {
		USERID: {
  			type: Sequelize.STRING(100),
			allowNull: true,
			primaryKey: true
		},
  		USERNAME: {
  			type: Sequelize.STRING(100),
			allowNull: true
		},
      	AGE: {
  			type: Sequelize.INTEGER,
			  allowNull: false
		},
		SEX: {
			type: Sequelize.STRING(10),
			allowNull: false
		},
		Adress: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	});

	return userInfo
};