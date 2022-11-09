const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
// 스키마 모델을 불러오면 자동으로 mongoDB에 컬렉션이 추가됨
// 카운터 컬렉션에 초기 데이터가 들어갈 첫 document 를 mongoDB 상에서 직접 생성
// {name: 'counter, communityNum: 1}
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema.js');


//react로부터 받은 요청 처리

//create
router.post('/create', (req, res)=>{

  // Counter 모델로 communityNum 값을 찾아서 전달받은 데이터와 합치기
  // Counter 모델레 findOne 메서드로 찾을 Document 의 조건 설정

  Counter.findOne({name: 'counter'})
    .exec()
    .then(doc=>{
      // 기존 프론트에서 받은 데이터에 communityNum 값 추가

      const temp = req.body;
      temp.communityNum = doc.communityNum;

      User.findOne({uid: temp.uid})
        .exec()
        .then(doc=>{
          temp.writer = doc._id;

          const PostModel = new Post(temp);

          PostModel.save()
            .then(()=>{
              Counter.updateOne({name: 'counter'}, {$inc: {communityNum: 1}})
                .then(()=>{
                  res.json({success: true});
                })
            })
            .catch(error=>{
              console.log(error);
              res.json({success: false})
            });
        })
    })
})

//post 불러오기
router.get('/read', (req, res)=>{
  const sort = {};
  if (req.query.sort === 'old') {
    sort.createdAt = 1;
  } else {
    sort.createdAt = -1;
  }

  Post.find()
    .populate('writer')
    .sort(sort)
    .limit(req.query.count)
    .exec()
    .then(doc=>{
      res.json({success: true, communityList: doc});
    })
    .catch(error=>{
      console.log(error);
      res.json({success: false});
    })
})

//detail 불러오기
router.get('/detail/:num', (req, res)=>{
  Post.findOne({communityNum: req.params.num})
    .populate('writer')
    .exec()
    .then(doc=>{
      res.json({success: true, detail: doc});
    })
    .catch(error=>{
      console.log(error);
      res.json({success: false});
    })
})

router.put('/edit', (req, res)=>{
  const temp = {
    title: req.body.title,
    content: req.body.content
  }

  Post.updateOne({communityNum: req.body.num}, {$set: temp})
    .exec()
    .then(()=>{
      res.json({success: true});
    })
    .catch(error=>{
      console.error(error);
      res.json({success: false});
    })
})

router.delete('/delete/:num', (req, res)=>{
  Post.deleteOne({communityNum: req.params.num})
    .exec()
    .then(()=>{
      res.json({success: true});
    })
    .catch(error=>{
      console.error(error);
      res.json({success: false});
    })
})

module.exports = router;