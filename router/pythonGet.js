const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const {spawn} = require('child_process');
const pythonShell = require('python-shell');

const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Study/Python/1')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

const upload = multer({storage: storage})


router.get('/', (req, res) => {
    let dataToSend;
    const python = spawn('python3', ["python/test.py"]);
    python.stdout.on('data', (data) => {
        dataToSend = data.toString();
    })
    python.on('close', (code) => {
        res.send(dataToSend)
    })
}
)


router.get('/digit', (req, res) =>{

    const options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: ['test1', 'value2', 'value3']
    };

    pythonShell.PythonShell.run('python/digit.py', options, function(err, results){
    
    if (err) throw err;

    console.log('results: %j', results)
    res.send('업로드한 이미지의 숫자는 ' + results + ' 입니다.')
    });
}
)

router.post('imgUpload', upload.single('file'), function(req, res){
    console.log(req.file.path)

    res.status(200).send({
        message: "OK",
        fileInfo: req.file.path
    })
}
)





module.exports = router;