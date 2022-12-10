import FormListing from "@/components/FormListing.jsx";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner.jsx";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import { db } from "@/firebase.js";
import { getGeoLocationDetail, saveListing } from "@/helpers/index.js";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function EditListing(props) {
  const [listingItem, setListingItem] = useState(null);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const listingId = params.listingId;

  const convertDataItem = async (docData) => {
    let location;
    try {
      location = await getGeoLocationDetail(docData.geoLocation);
    } catch (error) {
      // handler error
    }

    return {
      ...docData,
      address: location
    };
  };

  const fetchListingItem = async () => {
    const docRef = doc(db, "listings", listingId);
    try {
      const docSnap = await getDoc(docRef);
      setIsShowLoading(false);
      if (docSnap.exists()) {
        return setListingItem(await convertDataItem(docSnap.data()));
      }
      navigate("/profile");
    } catch (error) {
      navigate("/profile");
    }
  };

  useEffect(() => {
    setIsShowLoading(true);
    fetchListingItem();
  }, []);

  useEffect(() => {
    if (listingItem && listingItem.userRef !== userId) {
      navigate("/profile");
    }
  }, []);

  const onEditListing = async (data) => {
    setIsShowLoading(true);

    try {
      await saveListing(data, userId, listingId);
      toast.success("Successfully edit Listing item", {
        position: "bottom-center"
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Can't to edit Listing item", { position: "bottom-center" });
    }
    setIsShowLoading(false);
  };
  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold text-center">Edit a Listing</h1>
      <FormListing
        defaultValues={listingItem}
        onSubmit={onEditListing}
        submitButtonTitle="Edit Listing"
      />
      {isShowLoading && <Spinner />}
    </section>
  );
}

export default EditListing;
