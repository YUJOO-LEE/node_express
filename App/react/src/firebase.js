// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase추가
import firebase from 'firebase/compat/app';
//firebase auth 추가
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_EhZBvPzePM5JWyTuYJ90Hu0A_ZhsiuE",
  authDomain: "node-express-bb730.firebaseapp.com",
  projectId: "node-express-bb730",
  storageBucket: "node-express-bb730.appspot.com",
  messagingSenderId: "335449068787",
  appId: "1:335449068787:web:19e3ad2972e11e47d79386"
};

// Initialize Firebase
//firebase 초기화 구문으로 수정
firebase.initializeApp(firebaseConfig);

//firebase 내보내기
export default firebase;
