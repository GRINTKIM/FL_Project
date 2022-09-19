const express = require('express'); // 서버 사용
const { title } = require('process');
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용

const spawn = require("child_process").spawn;

const Sequelize = require('sequelize');
const db = require("../models");
const VisualData = db.VisualData;
const Op = db.Sequelize.Op;


router.get('/VisualData', async function(req, res){
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    VisualData.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving VisualData.",
        });
      });
  });


  router.post('/comp', async function(req, res){
    const comp = req.body.comp;
    const from = req.body.from;
    const to = req.body.to;
    var condition = comp ? { COMP_ID: { [Op.iLike]: `%${comp}%` } } : null;
    // var condition1 = comp ? { DATE_T: { [Op.between]: [comp.fromData, comp.toData] } } : null;

    if (comp == null) {
        return res.send('Please select COMP_ID')
    }
    //  --> 이거로 하면 null 값이 들어오면 메세지를 보낼 수 있으나 
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // 위와 같은 에러가 발생하고 서버가 종료된다.
    // 수정하고 프론트엔드에서 처리하는 방향으로 하자.
    // --> return을 사용함으로 해결
    else if (condition == null) {
      return res.send('Please select COMP_ID to satisfy WHERE clause.')
    }
    condition.DATE_T = {[Op.between]: [from, to]}
    VisualData.findAll({ where: condition })
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving VisualData.",
        });
      });
  });






  module.exports = router;
