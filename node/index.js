// mongodb+srv://yujoo:zk3hj4XjoQQijwOD@cluster0.f8z7pj4.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Post } = require('./model/postSchema.js');
// 스키마 모델을 불러오면 자동으로 mongoDB에 컬렉션이 추가됨
// 카운터 컬렉션에 초기 데이터가 들어갈 첫 document 를 mongoDB 상에서 직접 생성
// {name: 'counter, communityNum: 1}
const { Counter } = require('./model/counterSchema.js');

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

//create
app.post('/api/create', (request, response)=>{

  // Counter 모델로 communityNum 값을 찾아서 전달받은 데이터와 합치기
  // Counter 모델레 findOne 메서드로 찾을 Document 의 조건 설정

  Counter.findOne({name: 'counter'})
    .exec()
    .then(doc=>{
      // 기존 프론트에서 받은 데이터에 communityNum 값 추가

      const PostModel = new Post({
        title: request.body.title,
        content: request.body.content,
        communityNum: doc.communityNum
      })

      PostModel.save()
      .then(()=>{
        // 갱신 후 counter 의 communityNum 값 업데이트
        // updateOne( 찾을조건, 변경식 )
        // $inc = 증가 / $dec = 감소 / $set = 새로운 값으로 변경
        Counter.updateOne({name: 'counter'}, {$inc: {communityNum: 1}})
          .then(()=>{
            response.json({success: true});
          })
      })
      .catch(error=>{
        console.log(error);
        response.json({success: false})
      });
    })

})

//post 불러오기
app.post('/api/read', (request, response)=>{
  Post.find()
    .exec()
    .then(doc=>{
      response.json({success: true, communityList: doc});
    })
    .catch(error=>{
      console.log(error);
      response.json({success: false});
    })
})