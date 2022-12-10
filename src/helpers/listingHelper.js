import { getGeoLocation } from "@/helpers/locationHelpers.js";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "@/firebase.js";

const validate = (price, discount, odlImages, newImages) => {
  if (price <= discount && price > 0) {
    throw new Error("Discount Price can not less than Regular Price.");
  }
  if (odlImages.length + newImages.length > 6) {
    throw new Error("Maximum 6 images is allowed");
  }
};

export const uploadImages = async (images, userId) => {
  const uploadImage = async (image) => {
    return new Promise(async (rel, rej) => {
      const storage = getStorage();

      const imageRef = ref(
        storage,
        `${userId}-${image.name}-${new Date().getTime()}`
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

export const saveListing = async (data, userId, listingId) => {
  const {
    price,
    discount,
    images,
    offer,
    address,
    imgUrls: oldImageUrls = [],
    ...otherData
  } = data;

  validate(price, discount, oldImageUrls, images);

  const geoLocation = await getGeoLocation(address);

  const newImgUrls = await uploadImages(images, userId);

  const formData = {
    ...otherData,
    // be careful with field name imgUrls. We have the firestore rules check by this field name
    offer,
    imgUrls: [...oldImageUrls, ...newImgUrls],
    geoLocation,
    price,
    timestamp: serverTimestamp(),
    userRef: userId
  };

  if (offer) {
    formData.discount = discount;
  }

  try {
    if (listingId) {
      return await updateDoc(doc(db, "listings", listingId), formData);
    }
    return await addDoc(collection(db, "listings"), formData);
  } catch (error) {
    console.log(error);
    throw new Error("Can not create listing!");
  }
};
