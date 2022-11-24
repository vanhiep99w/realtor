// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbm3DtEvDuabsGr7mEf8mkQGSzZqxuv2E",
  authDomain: "realtor-clone-a0a24.firebaseapp.com",
  projectId: "realtor-clone-a0a24",
  storageBucket: "realtor-clone-a0a24.appspot.com",
  messagingSenderId: "2957309487",
  appId: "1:2957309487:web:5c0cad9444919cb465f8da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)
getAuth(app)