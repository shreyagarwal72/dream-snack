import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

const Auth = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateInputs = (isSignUp: boolean) => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      if (isSignUp) {
        nameSchema.parse(displayName);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs(false)) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message.includes("Invalid login credentials") ? "Invalid email or password" : error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs(true)) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { display_name: displayName },
        },
      });
      if (error) {
        toast.error(error.message.includes("already registered") ? "This email is already registered." : error.message);
      } else {
        toast.success("Account created! Check your email to verify.");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f5f7] to-[#e8e8e8] flex items-center justify-center p-4">
      <Helmet>
        <title>{isSignUpMode ? 'Sign Up' : 'Login'} - Dream Snack</title>
        <meta name="description" content="Login or sign up to Dream Snack" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <style>{`
        .auth-container * {
          font-family: 'Montserrat', sans-serif;
        }

        .container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 480px;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: #ff416c;
          background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid #dddddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          text-decoration: none;
          color: #333;
          transition: all 0.3s ease;
        }

        .social-container a:hover {
          background: #ff416c;
          color: white;
          border-color: #ff416c;
        }

        form {
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 50px;
          height: 100%;
          text-align: center;
        }

        h1 {
          font-weight: bold;
          margin: 0;
          color: #333;
        }

        span {
          font-size: 12px;
        }

        input {
          background-color: #eee;
          border: none;
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
          border-radius: 5px;
          outline: none;
          transition: all 0.3s ease;
        }

        input:focus {
          background-color: #e0e0e0;
          box-shadow: 0 0 5px rgba(255, 65, 108, 0.3);
        }

        button {
          border-radius: 20px;
          border: 1px solid #ff4b2b;
          background-color: #ff4b2b;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in, background-color 0.3s ease;
          cursor: pointer;
        }

        button:active {
          transform: scale(0.95);
        }

        button:focus {
          outline: none;
        }

        button:hover {
          background-color: #ff416c;
          border-color: #ff416c;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        button.ghost {
          background-color: transparent;
          border-color: #ffffff;
        }

        button.ghost:hover {
          background-color: rgba(255,255,255,0.2);
        }

        a {
          color: #333;
          font-size: 14px;
          text-decoration: none;
          margin: 15px 0;
          transition: color 0.3s ease;
        }

        a:hover {
          color: #ff416c;
        }

        .overlay-panel p {
          font-size: 14px;
          font-weight: 300;
          line-height: 20px;
          letter-spacing: 0.5px;
          margin: 20px 0 30px;
        }

        .overlay-panel h1 {
          color: white;
        }

        @media (max-width: 768px) {
          .container {
            min-height: auto;
          }
          
          .form-container {
            position: relative;
            width: 100%;
            height: auto;
          }
          
          .sign-in-container,
          .sign-up-container {
            position: relative;
            width: 100%;
            left: 0;
            transform: none !important;
            opacity: 1 !important;
          }
          
          .sign-up-container {
            display: none;
          }
          
          .container.right-panel-active .sign-in-container {
            display: none;
          }
          
          .container.right-panel-active .sign-up-container {
            display: block;
          }
          
          .overlay-container {
            display: none;
          }
          
          form {
            padding: 40px 30px;
          }
          
          .mobile-toggle {
            display: block;
            margin-top: 20px;
          }
          
          .mobile-toggle button {
            background: transparent;
            color: #ff4b2b;
            border: none;
            padding: 10px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className={`container ${isSignUpMode ? 'right-panel-active' : ''}`}>
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#"><i className="fab fa-facebook-f">f</i></a>
                <a href="#"><i className="fab fa-google-plus-g">G</i></a>
                <a href="#"><i className="fab fa-linkedin-in">in</i></a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading} style={{ marginTop: '16px' }}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin inline" /> : "Sign Up"}
              </button>
              <div className="mobile-toggle">
                <button type="button" onClick={toggleMode}>
                  Already have an account? Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#"><i className="fab fa-facebook-f">f</i></a>
                <a href="#"><i className="fab fa-google-plus-g">G</i></a>
                <a href="#"><i className="fab fa-linkedin-in">in</i></a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin inline" /> : "Sign In"}
              </button>
              <div className="mobile-toggle">
                <button type="button" onClick={toggleMode}>
                  Don't have an account? Sign Up
                </button>
              </div>
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={toggleMode}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={toggleMode}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
