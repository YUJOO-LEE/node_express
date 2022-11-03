// mongodb+srv://yujoo:zk3hj4XjoQQijwOD@cluster0.f8z7pj4.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 8888;
/*

express에서 react안쪽 build 폴더까지의 경로를 static으로 지정
__dirname : 현재 경로

*/
app.use(express.static(path.join(__dirname, '../react/build')));

app.listen(port, ()=>{
  mongoose.connect('mongodb+srv://yujoo:zk3hj4XjoQQijwOD@cluster0.f8z7pj4.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>
    console.log(`Server app listening on port ${port} with MongoDB`)
  ).catch(
    error=>console.error(error)
  );
});

app.get('/', (request, response)=>{
  //response.send('Hello World');
  response.sendFile(path.join(__dirname, '../react/build/index.html'));
});

app.get('*', (request, response)=>{
  response.sendFile(path.join(__dirname, '../react/build/index.html'));
});