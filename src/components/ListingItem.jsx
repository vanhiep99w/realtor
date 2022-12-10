import {AiFillDelete, GoLocation, MdModeEdit, MdModeEditOutline} from "react-icons/all";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom";
import {intlFormatDistance} from "date-fns";

const ActionButton = () => {

}

function ListingItem({ item }) {
  const { type,baths, beds, name, id, imgUrls, timestamp, price, location } = item;
  return (
    <Link to="/" className="rounded-lg overflow-hidden shadow-lg relative">
      <div>
        <img src={imgUrls[0]} alt={name} className="h-[170px] w-full object-cover object-center"/>
      </div>
      <div className="space-y-2 p-3">
        <p className=" text-xs font-semibold text-gray-500 flex items-center">
          <span><GoLocation className="text-emerald-600"/></span>
          <span className="truncate">
          {location}
          </span>
        </p>
        <p className="font-bold truncate">{name}</p>
        <p className="font-bold text-md text-cyan-600">${price} / Month</p>
        <div className="flex justify-between">
          <p className="text-xs font-medium">
            Beds &nbsp; {baths} Baths
          </p>
          <div className="flex space-x-2">
            <button data-for={`edit-item-${id}`} data-tip="Edit">
              <MdModeEdit className="text-lg text-red-400"/>
              <ReactTooltip id={`edit-item-${id}`} effect="solid"/>
            </button>

            <button data-for={`delete-item-${id}`} data-tip="Delete">
              <AiFillDelete className="text-lg text-red-400"/>
              <ReactTooltip id={`delete-item-${id}`} effect="solid"/>
            </button>

          </div>
        </div>

      </div>

      <p className="uppercase font-bold text-xs bg-sky-600 text-white inline-block rounded-md p-1 absolute top-1 left-1">{intlFormatDistance(timestamp.toDate(), new Date())}</p>
    </Link>
  );
}

export default ListingItem;
