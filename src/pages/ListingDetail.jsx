import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchListingItem } from "@/helpers/index.js";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/all";

function ListingDetail(props) {
  const { listingId = 0 } = useParams();
  const [loadingListing, setLoadingListing] = useState(false);
  const [listing, setListing] = useState(null);

  const fetchListing = async () => {
    setLoadingListing(true);
    try {
      const listingData = await fetchListingItem(listingId);
      setListing(listingData);
    } catch (error) {
      toast.error("Can not found the listing");
    }
    setLoadingListing(false);
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const shareLinkHandle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied", { position: "top-right" });
  };

  return (
    <div>
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          autoplay={{ delay: 3000 }}
        >
          {listing?.imgUrls?.map((url, index) => (
            <SwiperSlide key={url}>
              <div
                className="w-full overflow-hidden h-[400px]"
                style={{ background: `url(${url}) center no-repeat` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute top-3 right-3 z-10 p-3 bg-white rounded-full cursor-pointer"
          onClick={shareLinkHandle}
        >
          <FaShare />
        </div>
      </div>

      {loadingListing && <Spinner />}
    </div>
  );
}

export default ListingDetail;
