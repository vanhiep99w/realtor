import {useEffect, useState} from "react";
import {getGeoLocationDetail} from "@/helpers/index.js";

function ListingItemDetail({listingItem}) {
  const [address, setAddress] = useState("");
  const {name, price, geoLocation, type, description, beds, baths, parkingSpot, furnished} = listingItem;

  return (
    <div>
      <div className="color-">
          <p>{name} - ${price}</p>
      </div>
      <div className></div>
    </div>
  );
}

export default ListingItemDetail;