import { useLocation } from "react-router-dom"; // Commented out for demo purposes
import { CheckCircle, Copy, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const WithdrawalProcessing = () => {
  const location = useLocation(); // Commented out for demo
  const [copied, setCopied] = useState(false);
  const [InrExchangeRates, setInrExchangeRates] = useState(0);
  
  // Demo data - in real app, this would come from location.state
  const clientName = location.state.clientName;
  const withdrawalAmount = location.state.withdrawalAmount;
  const withdrawalCurrency = location.state.withdrawalCurrency;
  const withdrawalAddress = location.state.withdrawalAddress;
  const withdrawalTime = location.state.withdrawalTime;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(withdrawalAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formatCurrency = (amount, currency) => {
    return `${parseFloat(amount).toFixed(2)} ${currency}`;
  };
  
const formatCurrencyInr = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};
  useEffect(() => {
       // make a request to https://api.currencyapi.com/v3/latest?apikey=cur_live_mWaDVjC2HfkSLNJgU5YMKAk33pH81jcv9mCMMATZ to get the latest exchange rates for USD to INR
    axios.get("https://api.currencyapi.com/v3/latest?apikey=cur_live_mWaDVjC2HfkSLNJgU5YMKAk33pH81jcv9mCMMATZ")
      .then(response => {
        console.log(response.data);
        // get the exchange rate for USD to INR
       console.log(response.data["data"]["INR"]["value"]);
        setInrExchangeRates(response.data["data"]["INR"]["value"]);
        // setExchangeRates(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="text-right">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Cryptwire Mining
              </h1>
              <p className="text-sm text-slate-400">Secure Crypto Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Success Status Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Withdrawal Successful
          </h2>
          
          <p className="text-slate-300 text-lg mb-2">
            Your {withdrawalCurrency} withdrawal has been processed
          </p>
          
          <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 font-medium">Transaction Confirmed</span>
          </div>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 px-6 py-4 border-b border-slate-700/50">
            <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
            <p className="text-slate-400 text-sm">Complete withdrawal information</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Client Name */}
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium">Client Name</span>
              <span className="text-white font-semibold">{clientName}</span>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium">Amount</span>
              <div className="text-right">
              <div>
                <span className="text-white font-semibold text-lg">
                  {formatCurrency(withdrawalAmount, withdrawalCurrency)}
                </span>
              </div>
                
              <div>
                  {/* INR Amount */}
                <span className="text-green-400 font-semibold text-lg">
                 ≈ {formatCurrencyInr(withdrawalAmount * InrExchangeRates,)} INR
                </span>
              </div>
              </div>
            </div>

            {/* Withdrawal Address */}
            <div className="space-y-2">
              <span className="text-slate-400 font-medium block">Withdrawal Address</span>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-mono text-sm break-all mr-4">
                    {withdrawalAddress}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="flex-shrink-0 p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </button>
                </div>
                {copied && (
                  <div className="text-green-400 text-xs mt-2">Address copied to clipboard!</div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium">Status</span>
              <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Successful
              </span>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium mb-1">Application Time</span>
                <span className="text-white text-sm">{withdrawalTime}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium mb-1">Processing Time</span>
                <span className="text-white text-sm">~30 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Notice */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Important Information</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Your withdrawal has been successfully processed and sent to the blockchain network. 
                Please allow up to 30 minutes for the transaction to be fully confirmed on the network. 
                You can track your transaction using the withdrawal address provided above.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
            View Transaction History
          </button>
          <button className="flex-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
            Make Another Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalProcessing;