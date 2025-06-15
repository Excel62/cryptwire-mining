import {useNavigate} from 'react-router-dom';
import { useState } from 'react';





const WithdrawalSucessInput = () => {

  const navigate = useNavigate();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalCurrency, setWithdrawalCurrency] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [withdrawalTime, setWithdrawalTime] = useState('');
  const [clientName, setClientName] = useState('');
  const handleGenerate = () => {
   try{
     console.log("Withdrawal details generated");
    navigate('/withdrawal-success',{
      state:{
        clientName,
        withdrawalAmount,
        withdrawalCurrency,
        withdrawalAddress,
        withdrawalTime
      }
    }); 
   }catch(e){
      console.error("Error generating withdrawal details:", e);
   }
  };
  return (
    <div className="flex flex-col gap-2 w-full h-[100vh] align-center justify-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Input Form</h1>

     <label htmlFor="clientName"> Client Name:</label>
      <input onChange={(e) => setClientName(e.target.value)} className="input-field" type="text" id="clientName" name="clientName" />

      <label htmlFor="withdrawal">Withdrawal Amount:</label>
      <input onChange={(e) => setWithdrawalAmount(e.target.value)} className="input-field" type="number" id="withdrawal" name="withdrawal" />

      <label htmlFor="withdrawalCurrency">Currency:</label>
      <input onChange={(e) => setWithdrawalCurrency(e.target.value)} className="input-field" type="text" placeholder="e.g BTC" />

      <label htmlFor="withdrawalAddress">Withdrawal Address:</label>
      <input onChange={(e) => setWithdrawalAddress(e.target.value)} className="input-field" type="text" id="withdrawalAddress" name="withdrawalAddress" placeholder="Enter withdrawal address" />

      <label htmlFor="withdrawalTime">Time:</label>
      <input onChange={(e) => setWithdrawalTime(e.target.value)} className="input-field" type="datetime-local" id="withdrawalTime" name="withdrawalTime" />

      <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-600 transition-colors">Generate</button>
    </div>
  );
};

export default WithdrawalSucessInput;
