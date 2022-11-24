import {toast} from "react-toastify";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase.js";
import {useNavigate} from "react-router";

function OAuth(props) {

  const navigate = useNavigate();
  const onGoogleClick =async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()){
        await setDoc(docRef, {username: user.displayName, emailAddress: user.email, timestamp: serverTimestamp()})
      }

      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Could not authorize with google")
    }

  }
  return (
    <div><button type="button" className="w-full-button bg-red-700" onClick={onGoogleClick}>Continue with Google</button></div>
  );
}

export default OAuth;