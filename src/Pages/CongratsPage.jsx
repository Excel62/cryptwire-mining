import { useState, useEffect } from "react";
// import logo from "../assets/congratslogo.png";
import { useLocation } from "react-router-dom";

const CongratsPage = () => {
  const location = useLocation();
  const { activatedDate, miningCapital, antminerType } = location.state || {};
  
  // Demo data for showcase
  // const activatedDate = new Date().toISOString();
  // const miningCapital = "5000";
  // const antminerType = "Antminer S19 Pro";

  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setConfetti(particles);
  }, []);

  // Custom SVG Icons
  const TrophyIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );

  const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const DollarIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  const CpuChipIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );

  const ArrowRightIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Confetti Animation */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            top: "-10px",
            animation: `fall ${particle.duration}s ${particle.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo/Trophy Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Replace this div with your logo image */}
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <TrophyIcon className="w-16 h-16 text-white" />
            </div>
            {/* Animated rings around logo */}
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-yellow-400/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-orange-500/40 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
          
          {/* Congratulations Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-slate-200 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto">
              You have successfully activated your mining session! As part of our commitment to helping miners thrive, we wish you the best of luck in your upcoming mining journey.
            </p>
          </div>

          {/* Account Details */}
          <div className="space-y-6 mb-10">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Account Activation Details</h3>
              
              <div className="grid gap-6">
                {/* Activation Date */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-600/30">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                      <CalendarIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Activation Date</p>
                      <p className="text-white font-semibold">
                        {activatedDate ? new Date(activatedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mining Capital */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-600/30">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                      <DollarIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Mining Capital</p>
                      <p className="text-white font-semibold text-xl">
                        {miningCapital ? `$${parseInt(miningCapital).toLocaleString()}` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Antminer Type */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-600/30">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                      <CpuChipIcon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Antminer Type</p>
                      <p className="text-white font-semibold">{antminerType || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-400 font-semibold">Account Successfully Activated</span>
            </div>
            <p className="text-center text-slate-300 text-sm">
              Your mining operation is now ready to begin. Start earning cryptocurrency with your activated account!
            </p>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button className="group relative inline-flex items-center px-12 py-4 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 hover:from-orange-600 hover:via-yellow-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-white/20">
              <span className="mr-3">Continue to Dashboard</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Welcome to <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text font-semibold">Cryptwire Mining</span>
          </p>
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CongratsPage;