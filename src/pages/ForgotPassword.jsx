import signInKeyImage from "@/assets/sign-in-key.jpg";
import OAuth from "@/components/OAuth.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async ({ emailAddress }) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, emailAddress);
      toast.success("Email was sent. Please check your email", {
        position: "bottom-center",
        hideProgressBar: true
      });
    } catch (error) {
      console.log(error);
      toast.error("Could not find the email address!", {
        position: "bottom-center",
        hideProgressBar: true
      });
    }
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
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
              placeholder="Email address"
              {...register("emailAddress")}
            />

            <div className="flex flex-col uppercase text-center space-y-3">
              <button className="w-full-button bg-blue-600">
                Send reset password
              </button>
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

export default ForgotPassword;
