import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WithdrawalProcessing from './Pages/WithdrawalProcessing.jsx'
import CongratsPage from './Pages/CongratsPage.jsx'
import CongratsInput from './Pages/CongratsInput.jsx'
import WithdrawalInput from './Pages/WithdrawalInput.jsx'
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
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
