import { useState} from "react"
import { useNavigate } from 'react-router-dom';

const CongratsInput = () => {
  const [activatedDate, setActivatedDate] = useState("");
  const [miningCapital, setMiningCapital] = useState("");
  const [antminerType, setAntminerType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/congrats-page", {
      state: { activatedDate, miningCapital, antminerType },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full h-[100vh] align-center justify-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold mb-4">Congratulations Input Form</h1>
    
        <label htmlFor="activatedDate">Activated Date:</label>
        <input className="input-field" type="date" id="activatedDate" name="activatedDate" value={activatedDate} onChange={(e) => setActivatedDate(e.target.value)} />

        <label htmlFor="miningCapital">Mining Capital:</label>
        <input className="input-field" type="number" id="miningCapital" name="miningCapital" value={miningCapital} onChange={(e) => setMiningCapital(e.target.value)} />

        <label htmlFor="antminerType">Antminer Type:</label>
        <input className="input-field" type="text" id="antminerType" name="antminerType" value={antminerType} onChange={(e) => setAntminerType(e.target.value)} />

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-600 transition-colors">
            Generate
        </button>
    </div>
  )
}

export default CongratsInput;