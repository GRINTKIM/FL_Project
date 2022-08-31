const express = require('express')

const app = express()
app.use(express.json({
  limit:"50mb",
}));
app.use(express.urlencoded({
  limit:"50mb",
  extended: false
}));

const port = 3010

const cors = require('cors');
let corsOption = {
  origin: "http://localhost:8080",    // 허용 주소
  credential: true                    // true 시 설정 내용을 응답헤더에 추가해 줌
}
app.use(cors(corsOption))             // CORS 미들웨어 추가


const getTest1 = require('./router/getTest1')
const postTest1 = require('./router/postTest1')
const PostgreDataTest1 = require('./router/PostgreDataTest1')
const pythonGet = require('./router/pythonGet')

app.use('/api/getTest1', getTest1)
app.use('/api/postTest1', postTest1)
app.use('/api/PostgreDataTest1', PostgreDataTest1)
app.use('/api/pythonGet', pythonGet)

// app.get('/test', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const db = require("./models");
db.sequelize.sync();