import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWc6-jXUMm_3cgB_uxWVUUTna8mAf90jY",
  authDomain: "soci-65cc5.firebaseapp.com",
  projectId: "soci-65cc5",
  storageBucket: "soci-65cc5.appspot.com",
  messagingSenderId: "1097340605145",
  appId: "1:1097340605145:web:7cf432da81d02951c924c8",
  measurementId: "G-XT9HVHVLR6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
