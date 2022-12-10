import { GOOGLE_API } from "@/constants/index.js";
import { getKey } from "@/helpers/getKey.js";
import _ from "lodash";

export const getGeoLocation = async (address) => {
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

  return _.get(results, "[0].geometry.location", {});
};

export const getGeoLocationDetail = async ({ lat, lng }) => {
  try {
    const response = await fetch(
      `${GOOGLE_API}maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=${getKey(
        "VITE_REACT_APP_GOOGLE_CONSOLE_API_KEY"
      )}`
    );
    const { results } = await response.json();

    return results[0]["formatted_address"];
  } catch (error) {
    throw new Error("Could not found your location!");
  }
};
