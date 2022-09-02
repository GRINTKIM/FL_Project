module.exports = (sequelize, Sequelize) => {
	const VisualData = sequelize.define("VisualData", {
		DATE_T: {
  			type: Sequelize.DATE,
			allowNull: false,
			primaryKey: true
		},
        COMP_ID: {
  			type: Sequelize.STRING(100),
			allowNull: false,
            primaryKey: true
		},
        TOTALCNT: {
  			type: Sequelize.STRING(100),
			  allowNull: true
		},
	},{
		timestamps: false,
		freezeTableName: true
	});

	return VisualData
};