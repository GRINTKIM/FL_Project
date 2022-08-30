module.exports = (sequelize, Sequelize) => {
	const ORDER = sequelize.define("ORDER", {
		ORDER_NO: {
  			type: Sequelize.STRING(100),
			allowNull: false,
			primaryKey: true
		},
  		MEM_NO: {
  			type: Sequelize.STRING(100),
			allowNull: false
		},
      	ORDER_DATE: {
  			type: Sequelize.DATE,
			  allowNull: false
		},
		SHOP_CODE: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		PRODUCT_CODE: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
        SALES_AMT: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},{
		timestamps: false,
		freezeTableName: true
	});

	return ORDER
};