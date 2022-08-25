const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용

const Sequelize = require('sequelize');
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// router.post('/', function(req, res){
//     res.send('post 요청 받아 회신 드림')
// })

router.post('/sum', function(req, res){
    let {from, to} = req.body;

    var result = 0;

    for (var i=Number(from); i <= Number(to); i++){ // 형변환 해줘야 함
        result = result + i
    }
    res.send(from + ' ~ ' + to + ' 총 합 : ' + result)
})

router.post('/tutorial', async function(req, res, next){

    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!",
        });
        return;
    }

    let queryWhere = {};
    queryWhere.title = {
        [Op.eq]:req.body.title,
    }

    const tutorialData = await Tutorial.findAll({
        where : queryWhere,
        raw:true
    })

    return res.send(tutorialData);
    
})


module.exports = router;
