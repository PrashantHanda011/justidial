import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyC_cgn8ZDSg8QQr1mylsmRIMvC53KJZ7B0",
    authDomain: "justdial-a21e1.firebaseapp.com",
    projectId: "justdial-a21e1",
    storageBucket: "justdial-a21e1.appspot.com",
    messagingSenderId: "1015566975952",
    appId: "1:1015566975952:web:6363fb76a3e165e2dd2fd5",
    measurementId: "G-5MQJCB0LYQ"
  };

const fireapp=initializeApp(firebaseConfig)
const storage = getStorage(fireapp);
export { storage,fireapp as default}