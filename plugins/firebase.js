import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCFFiq8zXWwMA3hfc0teQqXXC31cpGovlw",
  authDomain: "filsc-34ad4.firebaseapp.com",
  databaseURL: "https://filsc-34ad4.firebaseio.com",
  projectId: "filsc-34ad4",
  storageBucket: "",
  messagingSenderId: "568941113064",
  appId: "1:568941113064:web:b9c9528182b63304"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase