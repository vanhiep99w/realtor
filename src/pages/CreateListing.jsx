import { toast } from "react-toastify";
import { saveListing } from "@/helpers/index.js";
import { getAuth } from "firebase/auth";
import Spinner from "@/components/Spinner.jsx";
import { useNavigate } from "react-router";
import FormListing from "@/components/FormListing.jsx";
import { useState } from "react";

function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await saveListing(data, userId);
      toast.success("Submit success", {
        hideProgressBar: true,
        position: "bottom-center"
      });
      setIsSubmitting(false);
      navigate("/profile");
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.message, {
        hideProgressBar: true,
        position: "bottom-center",
        toastId: error.message
      });
    }
  };

  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold text-center">Create a Listing</h1>
      <FormListing onSubmit={onSubmit} submitButtonTitle="Create Listing" />
      {isSubmitting && <Spinner />}
    </section>
  );
}

export default CreateListing;
