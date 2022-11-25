import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

function Profile(props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {}
  });
  const onSubmit = () => {
    if (editMode) {
    }

    setEditMode((prevState) => !prevState);
  };

  const onLogout = async () => {
    await auth.signOut();
    navigate("/");
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold mb-5">My Profile</h1>
      <form
        className="max-w-lg mx-auto flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input bg-red-200 placeholder-gray-700 disabled:bg-inherit focus:outline-none"
          placeholder="User name"
          {...register("name", { disabled: !editMode })}
        />
        <input
          className="input"
          placeholder="Email Address"
          {...register("emailAddress", { disabled: true })}
        />

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <p>Do you want to change your name?</p>
            <button className="text-red-500">
              {editMode ? "Edit" : "Apply change"}
            </button>
          </div>
          <button type="button" className="text-blue-500" onClick={onLogout}>
            Sign out
          </button>
        </div>
        <button className="w-full-button uppercase bg-blue-600 font-medium text-sm">
          Sell or rent your home
        </button>
      </form>
    </section>
  );
}

export default Profile;
