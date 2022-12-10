function ListingItemDetail({listingItem}) {
  const {name, price, geoLocation, type, description, beds, baths, parkingSpot, furnished} = listingItem;
  return (
    <div>
      <div className>
        <div>
          <span>${name}</span>

          <span>${name}</span>
        </div>
      </div>
      <div className></div>
    </div>
  );
}

export default ListingItemDetail;