const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const request = require('request'); // api 사용


// router.get('/', function(req, res){
//     res.redirect('https://www.naver.com')
// })

// router.get('/:gender/:age', function(req, res){
//     var params = req.params;
//     console.log(params)

//     res.send("Gender: " + gender + "/ Age: " + age)
// })

router.get('/', function(req, res){
    let gender = req.query.gender;
    let age = req.query.age;
    // res.send('Gender :' + gender + '\n' + 'Age :' + age)
    if (age.length > 1){
    res.send(age.slice(0, 1) + '0대 ' + gender + '성이 접속했습니다.')
    }
    else{res.send(age + '살 ' + gender + '자아이가 접속했습니다.')}
})

module.exports = router;
