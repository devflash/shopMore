import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyDx3PMz6naH0xQboxqVEDxIq3dehPjMymA',
  authDomain: 'shopmore-551c5.firebaseapp.com',
  databaseURL: 'https://shopmore-551c5-default-rtdb.firebaseio.com',
  projectId: 'shopmore-551c5',
  storageBucket: 'shopmore-551c5.appspot.com',
  messagingSenderId: '913623576217',
  appId: '1:913623576217:web:5ddf48a16b0f8a9267d208',
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

export { firestore };
