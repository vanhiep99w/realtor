import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@/firebase.js";
import { FcHome } from "react-icons/all";
import { Link } from "react-router-dom";
import ListingItem from "@/components/ListingItem.jsx";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoadingListings, setIsLoadingListing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: auth.currentUser.displayName,
      emailAddress: auth.currentUser.email
    }
  });

  const onSubmit = async ({ name }) => {
    if (editMode) {
      const user = auth.currentUser;
      try {
        if (user.displayName !== "name") {
          // Update displayName in Firebase Auth
          await updateProfile(user, { displayName: name });
          // Update userName in Firebase Firestore

          const docRef = doc(db, "users", user.uid);
          console.log(docRef);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await updateDoc(docRef, { userName: name });
          }

          toast.success("Update profile successfully", {
            position: "bottom-center",
            hideProgressBar: true
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Could not update profile detail!", {
          position: "bottom-center",
          hideProgressBar: true
        });
      }
    }

    setEditMode((prevState) => !prevState);
  };

  const fetchListings = async () => {
    const listingsRef = collection(db, "listings");

    const queryRef = query(
      listingsRef,
      where("userRef", "==", auth.currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const listingsSnap = await getDocs(queryRef);

    setListings(
      listingsSnap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
    );

    setIsLoadingListing(false);
  };

  useEffect(() => {
    setIsLoadingListing(true);
    fetchListings();
  }, []);

  console.log(listings);

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
              {editMode ? "Apply change" : "Edit"}
            </button>
          </div>
          <button type="button" className="text-blue-500" onClick={onLogout}>
            Sign out
          </button>
        </div>
        <Link
          to="/create-listing"
          className="w-full-button uppercase bg-blue-600 font-medium text-sm flex items-center justify-center space-x-2"
          type="button"
        >
          <FcHome className="text-2xl" />
          <span>Sell or rent your home</span>
        </Link>
      </form>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {isLoadingListings || listings.length === 0 || (
          <>
            <h2 className="text-center font-bold text-2xl">My Listings</h2>
            {listings.map((item) => (
              <ListingItem item={item} key={item.id} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
