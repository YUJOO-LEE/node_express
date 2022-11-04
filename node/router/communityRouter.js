const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
// 스키마 모델을 불러오면 자동으로 mongoDB에 컬렉션이 추가됨
// 카운터 컬렉션에 초기 데이터가 들어갈 첫 document 를 mongoDB 상에서 직접 생성
// {name: 'counter, communityNum: 1}
const { Counter } = require('../model/counterSchema.js');


//react로부터 받은 요청 처리

//create
router.post('/create', (request, response)=>{

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
router.post('/read', (request, response)=>{
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

//detail 불러오기
router.post('/detail', (request, response)=>{
  Post.findOne({communityNum: request.body.num})
    .exec()
    .then(doc=>{
      response.json({success: true, detail: doc});
    })
    .catch(error=>{
      console.log(error);
      response.json({success: false});
    })
})

module.exports = router;