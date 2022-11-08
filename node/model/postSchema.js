/*
스키마 : 데이터베이스에 저장될 자료 형식이나 키값을 강제하는 시스템적인 틀
*/

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  communityNum: Number,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
}, { collection: 'Posts'});

//모델은 스키마를 통해서 만드는 인스턴스
const Post = mongoose.model('Posts', postSchema);
module.exports = { Post };