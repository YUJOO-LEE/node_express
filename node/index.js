// npm init -y
// npm i express --save

// 서버구동
// node index.js
// 변경점 생길때마다 재구동 필요

const express = require('express');
const app = express();
const port = 8888;

app.get('/', (request, response)=>{
  response.send('Hello World');
});

app.listen(port, ()=>{
  console.log(`Server app listening on port ${port}`);
});