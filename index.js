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

const getTest1 = require('./router/getTest1')
const postTest1 = require('./router/postTest1')

app.use('/api/getTest1', getTest1)
app.use('/api/postTest1', postTest1)

// app.get('/test', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})