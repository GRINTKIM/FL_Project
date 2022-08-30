const express = require('express'); // 서버 사용
const { title } = require('process');
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용

const spawn = require("child_process").spawn;

const Sequelize = require('sequelize');
const db = require("../models");
const userInfo = db.userInfo;
const MEMBER = db.MEMBER;
const ORDER = db.ORDER;
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
  

  router.get('/MEMBER', async function(req, res){
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    MEMBER.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving MEMBER.",
        });
      });
  });


  router.get('/ORDER', async function(req, res){
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    ORDER.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ORDER.",
        });
      });
  });


  router.post('/memberjoin', async function(req, res, next){

    MEMBER.hasMany(ORDER, {foreignKey: 'MEM_NO'});
    ORDER.belongsTo(MEMBER, {foreignKey: 'MEM_NO'})

    const member_join = await MEMBER.findAll({
      include:[{
        model: ORDER,
        // attributes: ['MEM_NO'],
        required: true
      }]
    })


    if (!req.body.join) {
      res.status(400).send({
      message: "Content can not be empty!",
      });
      return;
    }
    else if (req.body.join == "inner" ) {
      res.send(member_join);
      return;
    }
    else if (req.body.join != "inner" ) {
      res.send({message: "Wrong parameter!"});
      return;
    }
    else return res.send({message: "Something is Wrong!"});
    })




module.exports = router;