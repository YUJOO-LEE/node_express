// mongodb+srv://yujoo:zk3hj4XjoQQijwOD@cluster0.f8z7pj4.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Post } = require('./model/postSchema.js')

const app = express();
const port = 8888;
/*

express에서 react안쪽 build 폴더까지의 경로를 static으로 지정
__dirname : 현재 경로

*/
app.use(express.static(path.join(__dirname, '../react/build')));

// 클라이언트에서 보내는 데이터를 받도록 설정 body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

//react로부터 받은 요청 처리
app.post('/api/create', (request, response)=>{
  const PostModel = new Post({
    title: request.body.title,
    content: request.body.content
  })

  PostModel.save()
    .then(()=>{
      response.json({success: true, result: request.body});
    })
    .catch(error=>{
      console.log(error);
      response.json({success: false})
    });
})