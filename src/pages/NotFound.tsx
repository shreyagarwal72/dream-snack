import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#252432] flex items-center justify-center p-4">
      <Helmet>
        <title>404 - Page Not Found | Dream Snack</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Dream Snack homepage." />
      </Helmet>

      <style>{`
        @property --a {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .glow-box-404 {
          position: relative;
          width: 450px;
          height: 400px;
          background: repeating-conic-gradient(
            from var(--a),
            #ff2770 0%,
            #ff2770 5%,
            transparent 5%,
            transparent 40%,
            #ff2770 50%
          );
          filter: drop-shadow(0 15px 50px #000);
          animation: rotating 4s linear infinite;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes rotating {
          0% { --a: 0deg; }
          100% { --a: 360deg; }
        }

        .glow-box-404::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: repeating-conic-gradient(
            from var(--a),
            #45f3ff 0%,
            #45f3ff 5%,
            transparent 5%,
            transparent 40%,
            #45f3ff 50%
          );
          filter: drop-shadow(0 15px 50px #000);
          border-radius: 20px;
          animation: rotating 4s linear infinite;
          animation-delay: -1s;
        }

        .glow-box-404::after {
          content: "";
          position: absolute;
          inset: 4px;
          background: #2d2d39;
          border-radius: 15px;
          border: 8px solid #25252b;
        }

        .glow-button {
          padding: 12px 24px;
          background: #45f3ff;
          border: none;
          border-radius: 30px;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          transition: all 0.5s ease;
          font-size: 0.9em;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .glow-button:hover {
          box-shadow: 0 0 10px #45f3ff, 0 0 60px #45f3ff;
        }

        .glow-button-outline {
          padding: 12px 24px;
          background: transparent;
          border: 2px solid #fff;
          border-radius: 30px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          transition: all 0.5s ease;
          font-size: 0.9em;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .glow-button-outline:hover {
          border-color: #ff2770;
          color: #ff2770;
          box-shadow: 0 0 10px rgba(255, 39, 112, 0.3);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="glow-box-404">
        <div 
          className="absolute flex justify-center items-center flex-col rounded-xl z-10 overflow-hidden p-8"
          style={{
            inset: '40px',
            background: 'rgba(0, 0, 0, 0.2)',
            boxShadow: 'inset 0 10px 20px rgba(0, 0, 0, 0.5)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <div className="text-center">
            <div className="float-animation mb-4">
              <Search className="w-16 h-16 text-[#45f3ff] mx-auto" style={{ filter: 'drop-shadow(0 0 20px #45f3ff)' }} />
            </div>
            
            <h1 
              className="text-7xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #ff2770, #45f3ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255, 39, 112, 0.5)',
              }}
            >
              404
            </h1>
            
            <h2 className="text-white text-xl font-semibold mb-2">
              Page Not Found
            </h2>
            
            <p className="text-gray-400 text-sm mb-6 max-w-[250px]">
              Oops! The page you're looking for seems to have wandered off.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="glow-button">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="glow-button-outline"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
