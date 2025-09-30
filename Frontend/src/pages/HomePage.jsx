// src/pages/LandingPage.jsx
import useAuthStore from "../stores/AuthStore"; 
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,_#111_0px,_#111_2px,_#000_2px,_#000_4px)]">
        </div>
      </div>
      
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-widest uppercase cursor-pointer relative group">
            PostVerse
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </h1>

          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-neutral-200 transform hover:translate-y-[-1px] transition-all duration-200 shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center text-center px-4 pt-16 relative z-10">
        <div className="max-w-4xl p-8 animate-fade-in-up">
          
          <h2 className="text-8xl md:text-9xl font-extrabold mb-6 leading-tight tracking-tighter uppercase 
                         text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-300 
                         [text-shadow:_0_0_20px_rgb(255_255_255_/_0.2)]">
            Share Your <br className="hidden sm:block" />
            <span className="text-white relative inline-block">
                World
                <span className="absolute left-0 bottom-[-5px] w-full h-1 bg-white transform scale-x-75 opacity-75"></span>
            </span>
            .
          </h2>

          <p className="text-xl md:text-2xl text-neutral-400 mb-12 font-light tracking-wide max-w-2xl mx-auto">
            A **vibrant community** built for sharing thoughts, connecting with friends, and exploring new ideas. Join the conversation.
          </p>

          {!isAuthenticated && (
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-white text-black text-xl font-bold rounded-full shadow-2xl shadow-white/50 
                         transform hover:scale-105 transition-all duration-300 ease-in-out 
                         focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-70 active:scale-100"
            >
              Get Started for Free
            </button>
          )}
        </div>
      </main>
    </div>
  );
}