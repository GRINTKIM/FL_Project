const express = require('express'); // 서버 사용
const router = express.Router(); // express 라이브러리 안에 있는 기능
const {spawn} = require('child_process');
const pythonShell = require('python-shell');


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


router.get('/test', (req, res) =>{

    const options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: ['test1', 'value2', 'value3']
    };

    pythonShell.PythonShell.run('python/test1.py', options, function(err, results){
    
    if (err) throw err;

    console.log('results: %j', results)
    res.send('업로드한 이미지의 숫자는 ' + results + ' 입니다.')
    });
}
)




module.exports = router;