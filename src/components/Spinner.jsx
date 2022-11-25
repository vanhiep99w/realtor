import spinner from "@/assets/spinner.svg";

function Spinner() {
  return (
    <div className="bg-black bg-opacity-30 flex items-center justify-center h-screen w-screen absolute top-0 left-0 z-20">
      <div className="w-20 h-20">
        <img src={spinner} alt="loading"/>
      </div>
    </div>
  );
}

export default Spinner;