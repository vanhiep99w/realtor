import spinner from "@/assets/spinner.svg";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function Spinner() {
  const body = document.body;
  body.classList.add("spinner-active");

  useEffect(() => {
    // Remove spinner-active class when component unmounted
    return () => {
      body.classList.remove("spinner-active");
    }
  }, [])

  // make fixed position to handle the scroll issue
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
