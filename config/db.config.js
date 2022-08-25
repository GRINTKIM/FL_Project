module.exports = {
	HOST: "localhost",
  	USER: "postgres",
  	// password에는 설치할때 설정한 비밀번호 입력!
  	PASSWORD: "1234",
  	DB: "postgres",
  	dialect: "postgres",
  	pool: {
		max: 5,
  		min: 0,
  		acquire: 30000,
  		idle: 10000
	}
};