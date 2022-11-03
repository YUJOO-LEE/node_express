// npm init -y
// npm i express --save

// 서버구동
// node index.js
// 변경점 생길때마다 재구동 필요

//const { request, path } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const port = 8888;
/*

express에서 react안쪽 build 폴더까지의 경로를 static으로 지정
__dirname : 현재 경로

*/
app.use(express.static(path.join(__dirname, '../react/build')));

app.listen(port, ()=>{
  console.log(`Server app listening on port ${port}`);
});

app.get('/', (request, response)=>{
  //response.send('Hello World');
  response.sendFile(path.join(__dirname, '../react/build/index.html'));
});

app.get('*', (request, response)=>{
  response.sendFile(path.join(__dirname, '../react/build/index.html'));
});