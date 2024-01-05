import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX7re6yDioJoT3pSD8NDuj5iDa5hoYvnI",
  authDomain: "recycle-coin.firebaseapp.com",
  projectId: "recycle-coin",
  storageBucket: "recycle-coin.appspot.com",
  messagingSenderId: "802357417408",
  appId: "1:802357417408:web:1cc0a5160ca78129816425",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const workRef = collection(db, "Work");
const auth = getAuth(app);

export { workRef, db, auth };
