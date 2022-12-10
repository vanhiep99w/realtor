import { AiFillDelete, GoLocation, MdModeEdit } from "react-icons/all";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { intlFormatDistance } from "date-fns";

function ListingItem({ item, onEdit, onDelete }) {
  const { type, baths, beds, name, id, imgUrls, timestamp, price, location } =
    item;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <Link to={`/category/${type}/${id}`}>
        <div>
          <img
            src={imgUrls[0]}
            alt={name}
            className="h-[170px] w-full object-cover object-center"
          />
        </div>
        <div className="space-y-2 p-3">
          <p className=" text-xs font-semibold text-gray-500 flex items-center">
            <span>
              <GoLocation className="text-emerald-600" />
            </span>
            <span className="truncate">{location}</span>
          </p>
          <p className="font-bold truncate">{name}</p>
          <p className="font-bold text-md text-cyan-600">${price} / Month</p>
          <div className="flex justify-between">
            <p className="text-xs font-medium">Beds &nbsp; {baths} Baths</p>
          </div>
        </div>
      </Link>
      <div className="flex space-x-2 absolute bottom-3 right-3">
        {onEdit && (
          <button
            data-for={`edit-item-${id}`}
            data-tip="Edit"
            type="button"
            onClick={() => onEdit(id)}
          >
            <MdModeEdit className="text-lg text-red-400" />
            <ReactTooltip id={`edit-item-${id}`} effect="solid" />
          </button>
        )}

        {onDelete && (
          <button
            data-for={`delete-item-${id}`}
            data-tip="Delete"
            onClick={() => onDelete(id)}
            type="button"
          >
            <AiFillDelete className="text-lg text-gray-600" />
            <ReactTooltip id={`delete-item-${id}`} effect="solid" />
          </button>
        )}
      </div>
      <p className="uppercase font-bold text-xs bg-sky-600 text-white inline-block rounded-md p-1 absolute top-1 left-1">
        {intlFormatDistance(timestamp.toDate(), new Date())}
      </p>
    </div>
  );
}

export default ListingItem;
