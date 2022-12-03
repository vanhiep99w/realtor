import spinner from "@/assets/spinner.svg";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function Spinner({ isShow = true }) {
  const body = document.body;
  if (!isShow) {
    body.classList.remove("spinner-active");
    return null;
  }

  body.classList.add("spinner-active");

  // make fixed to handle the scroll issue
  return createPortal(
    <div className="bg-black bg-opacity-30 flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-20">
      <div className="w-20 h-20">
        <img src={spinner} alt="loading" />
      </div>
    </div>,
    document.getElementById("spinner")
  );
}

export default Spinner;
