import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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

  const validateInputs = (isSignUpForm: boolean) => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      if (isSignUpForm) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs(false)) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs(true)) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please login instead.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Account created! Please check your email to verify.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4 overflow-hidden">
      <Helmet>
        <title>{isSignUp ? 'Sign Up' : 'Login'} - Dream Snack | Fresh Homemade Food Delivery</title>
        <meta name="description" content={isSignUp ? 'Create your Dream Snack account and get fresh homemade food delivered in 10 minutes.' : 'Login to Dream Snack and order fresh homemade food delivered in 10 minutes.'} />
        <meta name="keywords" content="login, sign up, authentication, food delivery account, order food" />
        <link rel="canonical" href={`https://dreamsnack.com/auth`} />
      </Helmet>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .auth-container * {
          font-family: 'Poppins', sans-serif;
        }
        
        .auth-wrapper {
          width: 850px;
          height: 550px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          backdrop-filter: blur(20px);
          border-radius: 30px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .form-container {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 50px;
          transition: all 0.6s ease-in-out;
        }
        
        .login-container {
          left: 0;
          opacity: 1;
          z-index: 2;
        }
        
        .signup-container {
          left: 0;
          opacity: 0;
          z-index: 1;
        }
        
        .auth-wrapper.active .login-container {
          transform: translateX(100%);
          opacity: 0;
          z-index: 1;
        }
        
        .auth-wrapper.active .signup-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 2;
        }
        
        .overlay-container {
          position: absolute;
          width: 50%;
          height: 100%;
          right: 0;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        
        .auth-wrapper.active .overlay-container {
          transform: translateX(-100%);
        }
        
        .overlay {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          position: relative;
          width: 200%;
          height: 100%;
          left: -100%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        
        .auth-wrapper.active .overlay {
          transform: translateX(50%);
        }
        
        .overlay-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          text-align: center;
          color: white;
          transition: transform 0.6s ease-in-out;
        }
        
        .overlay-left {
          transform: translateX(-20%);
          right: 50%;
        }
        
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
        
        .auth-wrapper.active .overlay-left {
          transform: translateX(0);
        }
        
        .auth-wrapper.active .overlay-right {
          transform: translateX(20%);
        }
        
        .form-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 30px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .input-group {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
        }
        
        .input-group input {
          width: 100%;
          padding: 15px 20px 15px 50px;
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          outline: none;
          font-size: 14px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .input-group input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        
        .input-group input:focus {
          border-color: #667eea;
          background: rgba(255,255,255,0.15);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
        
        .input-group .icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.5);
          transition: color 0.3s ease;
        }
        
        .input-group input:focus + .icon {
          color: #667eea;
        }
        
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          margin-top: 10px;
        }
        
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .ghost-btn {
          background: transparent;
          border: 2px solid white;
          padding: 12px 45px;
          border-radius: 50px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .ghost-btn:hover {
          background: white;
          color: #764ba2;
          transform: scale(1.05);
        }
        
        .overlay-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .overlay-text {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        
        .forgot-link {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          text-decoration: none;
          margin-top: 15px;
          transition: color 0.3s ease;
        }
        
        .forgot-link:hover {
          color: #667eea;
        }
        
        @media (max-width: 768px) {
          .auth-wrapper {
            width: 100%;
            max-width: 400px;
            height: auto;
            min-height: 550px;
          }
          
          .form-container {
            width: 100%;
            padding: 40px 30px;
            position: relative;
            transform: none !important;
            opacity: 1 !important;
            z-index: 2 !important;
          }
          
          .login-container {
            display: block;
          }
          
          .signup-container {
            display: none;
          }
          
          .auth-wrapper.active .login-container {
            display: none;
          }
          
          .auth-wrapper.active .signup-container {
            display: block;
          }
          
          .overlay-container {
            display: none;
          }
          
          .mobile-toggle {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          
          .mobile-toggle button {
            background: none;
            border: none;
            color: #667eea;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className={`auth-wrapper ${isSignUp ? 'active' : ''}`}>
          {/* Login Form */}
          <div className="form-container login-container">
            <h2 className="form-title">Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <Mail className="icon" size={18} />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Lock className="icon" size={18} />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Please wait...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
              <a href="#" className="forgot-link block text-center">Forgot your password?</a>
            </form>
            <div className="mobile-toggle">
              <button onClick={toggleMode}>
                Don't have an account? Sign Up
              </button>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="form-container signup-container">
            <h2 className="form-title">Create Account</h2>
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  disabled={loading}
                />
                <User className="icon" size={18} />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <Mail className="icon" size={18} />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Lock className="icon" size={18} />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Please wait...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <div className="mobile-toggle">
              <button onClick={toggleMode}>
                Already have an account? Sign In
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h3 className="overlay-title">Welcome Back!</h3>
                <p className="overlay-text">
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost-btn" onClick={toggleMode}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h3 className="overlay-title">Hello, Friend!</h3>
                <p className="overlay-text">
                  Enter your personal details and start your journey with us
                </p>
                <button className="ghost-btn" onClick={toggleMode}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
