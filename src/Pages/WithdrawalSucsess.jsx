import { useLocation } from "react-router-dom";

const WithdrawalProcessing = () => {
  const location = useLocation();
  const {
    clientName,
    withdrawalAmount,
    withdrawalCurrency,
    withdrawalAddress,
    withdrawalTime,
  } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#242424] text-white px-4">
      <h1 className="text-2xl font-bold mb-10 text-center  bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
        Cryptwire Mining
      </h1>

      {/* Half moon with shadow on top curved part */}
      <div
        className="w-82 h-46 bg-[#242424] rounded-t-full border border-green-200 border-b-0 flex flex-col items-center justify-center "
        style={{ boxShadow: "0 -10px 25px -5px rgba(34, 197, 94, 0.5)" }}
      >
        <span className=" text-center font-semibold not-italic tracking-wide text-[#c9c9c9] p-3 mt-3 text-2l">
          Confirm your {withdrawalCurrency} <br /> Withdrawal
        </span>

        <button
          className="shadow-lg rounded-full text-[#3e8a5f] p-2"
          style={{ boxShadow: "0px 9px 8px 0px rgba(34, 197, 94, 0.5)" }}
        >
          Successful
        </button>
      </div>
      <div className="w-92  h-8 mb-[0.5px] bg-[#11301f] justify-center "></div>

      <div className="w-88  mb-2 bg-[#11301f]">
        <h2 className="p-3">Dear {clientName},</h2>
        <h2 className="p-3">
          We are pleased to inform you that your {withdrawalCurrency} withdrawal
          has been successfully processed!
        </h2>
        <div className="w-auto  bg-[#040806] m-4 rounded-tl-lg rounded-tr-lg p-5">
          <h1 className="text-lg font-bold text-[#3e8a5f]">
            Transaction Details
          </h1>
          <hr className="border-[#3e8a5f] mt-7 mb-2" />
          <p className="text-sm text-[#e0e0e0] break-all text-right mt-4">
            Withdrawal Address:{" "}
            <span className="text-[#3e8a5f]">{withdrawalAddress}</span>
          </p>
          <p className="text-sm text-[#e0e0e0] mt-7">
            Amount:{" "}
            <span className="text-[#3e8a5f] ml-27">
              {withdrawalAmount} {withdrawalCurrency}
            </span>
          </p>
          <p className="text-sm text-[#e0e0e0] mt-7">
            Status: <span className="text-[#3e8a5f] ml-27">Successful</span>
          </p>
          <p className="text-sm text-[#e0e0e0] mt-7">
            Application Time:{" "}
            <span className="text-[#3e8a5f] ml-1">{withdrawalTime}</span>
          </p>
          <p className="text-sm text-[#e0e0e0] mt-7">
            Estimated Time:{" "}
            <span className="text-[#3e8a5f] ml-10">30 minutes</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalProcessing;
