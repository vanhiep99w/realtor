import { useForm } from "react-hook-form";
import signInKeyImage from "@/assets/sign-in-key.jpg";
import { Link } from "react-router-dom";
import OAuth from "@/components/OAuth.jsx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function SignUp(props) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ emailAddress, password, name }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      // store user to firestore
      const userMetaData = {
        userName: name,
        emailAddress: emailAddress,
        timestamp: serverTimestamp()
      };
      delete user.password;
      await setDoc(doc(db, "users", user.uid), userMetaData);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="p-5">
        <div className="flex mx-auto lg:max-w-6xl space-y-10 lg:space-x-20 flex-col lg:flex-row">
          <div className="w-full flex-1">
            <img
              src={signInKeyImage}
              alt="key"
              className="w-full rounded-2xl"
            />
          </div>
          <form
            className="w-full flex-1 flex flex-col space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="input"
              placeholder="Full name"
              {...register("name")}
            />
            <input
              type="text"
              className="input"
              placeholder="Email address"
              {...register("emailAddress")}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password")}
            />
            <div className="flex justify-between items-center">
              <div className="ver">
                <span className="text-sm">Don't have an account? </span>
                <Link to="/sign-in" className="text-red-600">
                  Sign In
                </Link>
              </div>
              <Link to="/forgot-password" className="text-blue-600">
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col uppercase text-center space-y-3">
              <button className="w-full-button bg-blue-600">Sign in</button>
              <p className="relative before:content-[''] before:border-t before:border-gray-300 before:w-[45%] before:absolute before:top-1/2 before:left-0 after:content-[''] after:border-t after:border-gray-300 after:w-[45%] after:absolute after:top-1/2 after:left-[55%]">
                or
              </p>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
