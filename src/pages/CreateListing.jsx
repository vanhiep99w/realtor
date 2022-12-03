import { useForm } from "react-hook-form";
import ToggleField from "@/components/ToggleField.jsx";
import FieldWrapper from "@/components/FieldWrapper.jsx";
import { toast } from "react-toastify";
import { getKey } from "@/helpers/index.js";
import { GOOGLE_API } from "@/constants/index.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {addDoc, collection } from "firebase/firestore"
import _ from "lodash";
import { serverTimestamp } from "firebase/firestore";
import {db} from "@/firebase.js";
import {useState} from "react";
import Spinner from "@/components/Spinner.jsx";

function CreateListing() {
  const {
    register,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      type: "sell",
      name: "",
      beds: 1,
      baths: 1,
      parkingSpot: false,
      furnished: false,
      address: "",
      description: "",
      offer: false,
      price: 0,
      discount: 0,
      images: []
    },
    shouldUseNativeValidation: true
  });

  const [type, parkingSpot, furnished, offer] = watch([
    "type",
    "parkingSpot",
    "furnished",
    "offer"
  ]);

  const validate = (price, discount, images) => {
    if (price <= discount && price > 0) {
      throw new Error("Discount Price can not less than Regular Price.");
    }
    if (images.length > 6) {
      throw new Error("Maximum 6 images is allowed");
    }
  };

  const getGeoLocation = async (address) => {
    // Load geo location by address input value
    const response = await fetch(
      `${GOOGLE_API}maps/api/geocode/json?address=${address}&key=${getKey(
        "VITE_REACT_APP_GOOGLE_CONSOLE_API_KEY"
      )}`
    );

    const { status, results } = await response.json();

    if (status !== "OK" || results.length <= 0) {
      throw new Error("Could not found your address!");
    }

    const { lat = 0, lng = 0 } = _.get(results, "[0].geometry.location", {});

    return { lat, lng };
  };

  const uploadImages = async (images) => {
    const uploadImage = async (image) => {
      return new Promise(async (rel, rej) => {
        const storage = getStorage();
        const auth = getAuth();
        const imageRef = ref(
          storage,
          `${auth.currentUser.uid}-${image.name}-${new Date().getTime()}`
        );
        try {
          const result = await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(result.ref);
          rel(downloadURL);
        } catch (error) {
          rej(error);
        }
      });
    };

    try {
      // Update image to firebase
      return await Promise.all([...images].map((image) => uploadImage(image)));
    } catch (error) {
      throw new Error("Failed to Update images!");
    }
  };

  const storeData = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "listings"), data)
    } catch (error) {
      console.log(error)
      throw new Error("Can not create listing!")
    }

  }

  const onSubmit = async (data) => {
    const { price, discount, images, offer, address, ...otherData } = data;

    try {
      validate(price, discount, images);

      const geoLocation = await getGeoLocation(address);


      const imgUrls = await uploadImages(images);

      const formData = {
        ...otherData,
        // be careful with field name imgUrls. We have the firestore rules check by this field name
        imgUrls,
        geoLocation,
        price,
        timestamp: serverTimestamp()
      };

      if (offer) {
        formData.discount = discount;
      }

      const docRef = await storeData(formData)

      toast.success("Submit success", {
        hideProgressBar: true,
        position: "bottom-center",
      });

      console.log(formData);
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
        position: "bottom-center",
        toastId: error.message
      });
      throw error;
    }
  };

  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold text-center">Create a Listing</h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper
            title="Sell/Rent"
            render={() => (
              <ToggleField
                options={[
                  { title: "Sell", value: "sell" },
                  { title: "Rent", value: "rent" }
                ]}
                selectedValue={type}
                onChange={(value) => setValue("type", value)}
              />
            )}
          />

          <FieldWrapper
            title="Name"
            render={(id) => (
              <input
                {...register("name", { required: true })}
                className="input p-2"
                placeholder="Name"
                id={id}
              />
            )}
          />

          <div className="flex [&>*]:w-1/3 space-x-3">
            <FieldWrapper
              title="Beds"
              render={(id) => (
                <input
                  {...register("beds", { min: 1, valueAsNumber: true })}
                  className="input p-2 text-center"
                  placeholder="Beds"
                  type="number"
                  id={id}
                />
              )}
            />

            <FieldWrapper
              title="Baths"
              render={(id) => (
                <input
                  {...register("baths", { min: 1, valueAsNumber: true })}
                  className="input p-2 text-center"
                  placeholder="Baths"
                  type="number"
                  id={id}
                />
              )}
            />
          </div>

          <FieldWrapper
            title="Parking Spot"
            render={() => (
              <ToggleField
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false }
                ]}
                onChange={(value) => setValue("parkingSpot", value)}
                selectedValue={parkingSpot}
              />
            )}
          />

          <FieldWrapper
            title="Furnished"
            render={() => (
              <ToggleField
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false }
                ]}
                onChange={(value) => setValue("furnished", value)}
                selectedValue={furnished}
              />
            )}
          />

          <FieldWrapper
            title="Address"
            render={(id) => (
              <input
                {...register("address", { required: true })}
                placeholder="Address"
                className="input p-2"
                id={id}
              />
            )}
          />

          <FieldWrapper
            title="Description"
            render={(id) => (
              <input
                {...register("description", { required: true })}
                placeholder="Description"
                className="input p-2"
                id={id}
              />
            )}
          />

          <FieldWrapper
            title="Offer"
            render={() => (
              <ToggleField
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false }
                ]}
                onChange={(value) => setValue("offer", value)}
                selectedValue={offer}
              />
            )}
          />

          <FieldWrapper
            title="Regular Price"
            render={(id) => (
              <div className="flex items-center space-x-5">
                <input
                  {...register("price", {
                    required: true,
                    min: 1,
                    valueAsNumber: true
                  })}
                  className="input p-2 w-1/2"
                  type="number"
                  id={id}
                />
                <p className="flex-1">$ / Month</p>
              </div>
            )}
          />

          {offer && (
            <FieldWrapper
              title="Discounted Price"
              className="w-1/2"
              render={(id) => (
                <input
                  {...register("discount", { valueAsNumber: true })}
                  className="input p-2"
                  type="number"
                  id={id}
                />
              )}
            />
          )}

          <FieldWrapper
            title="Images"
            smallDescription="The first image will be the cover (max 6)."
            render={(id) => (
              <input
                {...register("images", { required: true })}
                className="input"
                type="file"
                multiple={true}
                id={id}
                accept=".jpg,.png.jpeg"
              />
            )}
          />

          <button className="w-full-button bg-blue-600 text-white">
            Create Listing
          </button>
        </form>
      </div>

      <Spinner isShow={isSubmitting}/>
    </section>
  );
}

export default CreateListing;
