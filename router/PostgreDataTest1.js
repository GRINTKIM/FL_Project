const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용

const spawn = require("child_process").spawn;

const Sequelize = require('sequelize');
const db = require("../models");
const userInfo = db.userInfo;
const Op = db.Sequelize.Op;



router.get('/userInfo', async function(req, res){
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    userInfo.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userInfo.",
        });
      });
  });
  




module.exports = router;