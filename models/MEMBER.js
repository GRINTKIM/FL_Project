module.exports = (sequelize, Sequelize) => {
	const MEMBER = sequelize.define("MEMBER", {
		MEM_NO: {
  			type: Sequelize.STRING(100),
			allowNull: false,
			primaryKey: true
		},
  		GENDER: {
  			type: Sequelize.STRING(100),
			allowNull: false
		},
      	AGEBAND: {
  			type: Sequelize.INTEGER,
			  allowNull: false
		},
		DATE: {
			type: Sequelize.DATE,
			allowNull: false
		},
		ADDRESS: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	},{
		timestamps: false,
		freezeTableName: true
	});

	return MEMBER
};