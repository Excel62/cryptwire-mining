import { useNavigate } from "react-router-dom"
import WithdrawalInput from './WithdrawalInput';

const Home = () => {
  const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(path);
    };

  return (
    <div className="flex flex-col gap-2 w-full h-[100vh] align-center justify-center p-4 bg-gray-800 text-white">
      <button onClick={() => handleNavigate("/congrats-input")} className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-600 transition-colors">
        Go to Congrats Input
      </button>
      <button onClick={() => handleNavigate("/withdrawal-input")} className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-600 transition-colors">
        Go to Withdrawal Input
      </button>
    </div>
  )
}

export default Home