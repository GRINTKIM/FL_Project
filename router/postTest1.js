const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용


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

module.exports = router;
