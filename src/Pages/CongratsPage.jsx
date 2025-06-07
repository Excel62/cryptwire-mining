import logo from "../assets/congratslogo.png";
import { useLocation } from "react-router-dom";
const CongratsPage = () => {
  const location = useLocation();
  const { activatedDate, miningCapital, antminerType } = location.state || {};

  return (
    <div className="flex flex-col gap-2 w-full h-[100vh] align-center justify-center p-4 bg-gray-800 text-white">
      <img src={logo} alt="Congratulations" className="w-1/2 mx-auto mb-15" />
      <h1 className="text-2xl font-bold mb-4 text-center">Congratulations!</h1>
      <p className="text-center text-lg mb-4 font-bold text-gray-300">
        You have successfully activated your mining account As part of our
        commitment to helping miners thrive, we wish you the best of luck in
        your upcoming days of mining!
      </p>
      <div className="flex justify-between  width-full">
        <h2 className="text-gray-300 font-bold">Activated Date</h2>
        <p className="font-bold">
          {activatedDate ? new Date(activatedDate).toLocaleDateString() : "N/A"}
        </p>
      </div>
      <div className="flex justify-between  width-full">
        <h2 className="text-gray-300 font-bold">Mining Capital</h2>
        <p className="font-bold">
          {miningCapital ? `$${miningCapital}` : "N/A"}
        </p>
      </div>
      <div className="flex justify-between  width-full">
        <h2 className="text-gray-300 font-bold">Antminer Type</h2>
        <p className="font-bold">{antminerType || "N/A"}</p>
      </div>

      <button className="px-8 py-4 mt-14 text-white font-semibold text-lg rounded-lg bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 hover:from-orange-600 hover:via-yellow-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        Continue
      </button>
    </div>
  );
};

export default CongratsPage;
