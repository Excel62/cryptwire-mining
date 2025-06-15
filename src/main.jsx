import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WithdrawalProcessing from './Pages/WithdrawalProcessing.jsx'
import CongratsPage from './Pages/CongratsPage.jsx'
import CongratsInput from './Pages/CongratsInput.jsx'
import WithdrawalInput from './Pages/WithdrawalInput.jsx'
import WithdrawalSucsess from './Pages/WithdrawalSucsess.jsx'
import WithdrawalSucessInput from './Pages/WithwrawalsucsessInput.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/withdrawal-processing",
    element: <WithdrawalProcessing />,
  },
  {
    path: "/congrats-page",
    element: <CongratsPage />,
  },
  {
    path: "/congrats-input",
    element: <CongratsInput />,
  },
  {
    path: "/withdrawal-input",
    element: <WithdrawalInput />,
  },
  {
    path: "/withdrawal-success",
    element: <WithdrawalSucsess />,
  },
  {
    path: "/withdrawal-success-input",
    element: <WithdrawalSucessInput />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
