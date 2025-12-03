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
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
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

  const validateInputs = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      if (!isLogin) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
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
      } else {
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
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#252432] flex items-center justify-center p-4">
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - Dream Snack | Fresh Homemade Food Delivery</title>
        <meta name="description" content={isLogin ? 'Login to Dream Snack and order fresh homemade food delivered in 10 minutes.' : 'Create your Dream Snack account and get fresh homemade food delivered in 10 minutes.'} />
        <meta name="keywords" content="login, sign up, authentication, food delivery account, order food" />
        <link rel="canonical" href={`https://dreamsnack.com/auth`} />
      </Helmet>
      
      <style>{`
        @property --a {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .glow-box {
          position: relative;
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
          transition: all 0.5s ease;
        }

        @keyframes rotating {
          0% { --a: 0deg; }
          100% { --a: 360deg; }
        }

        .glow-box::before {
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

        .glow-box::after {
          content: "";
          position: absolute;
          inset: 4px;
          background: #2d2d39;
          border-radius: 15px;
          border: 8px solid #25252b;
        }

        .glow-input {
          width: 100%;
          padding: 12px 20px;
          outline: none;
          font-size: 1em;
          color: #fff;
          background: rgba(0, 0, 0, 0.1);
          border: 2px solid #fff;
          border-radius: 30px;
          transition: all 0.3s ease;
        }

        .glow-input::placeholder {
          color: #999;
        }

        .glow-input:focus {
          border-color: #45f3ff;
          box-shadow: 0 0 10px rgba(69, 243, 255, 0.3);
        }

        .glow-submit {
          width: 100%;
          padding: 12px 20px;
          background: #45f3ff;
          border: none;
          border-radius: 30px;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          transition: all 0.5s ease;
          font-size: 1em;
        }

        .glow-submit:hover {
          box-shadow: 0 0 10px #45f3ff, 0 0 60px #45f3ff;
        }

        .glow-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <div 
        className="glow-box"
        style={{
          width: isHovered ? '450px' : '400px',
          height: isHovered ? (isLogin ? '480px' : '560px') : '200px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="absolute flex justify-center items-center flex-col rounded-xl z-10 overflow-hidden transition-all duration-500"
          style={{
            inset: isHovered ? '40px' : '60px',
            background: 'rgba(0, 0, 0, 0.2)',
            boxShadow: 'inset 0 10px 20px rgba(0, 0, 0, 0.5)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <form 
            onSubmit={handleSubmit}
            className="relative flex justify-center items-center flex-col gap-5 w-[70%] transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(0px)' : 'translateY(126px)',
            }}
          >
            <h2 className="text-white uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="text-[#ff2770]" style={{ textShadow: '0 0 5px #ff2770, 0 0 30px #ff2770' }}>♥</span>
              {isLogin ? 'Login' : 'Sign Up'}
              <span className="text-[#ff2770]" style={{ textShadow: '0 0 5px #ff2770, 0 0 30px #ff2770' }}>♥</span>
            </h2>

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={loading}
                className="glow-input"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="glow-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="glow-input"
            />

            <button
              type="submit"
              disabled={loading}
              className="glow-submit flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"}</>
              )}
            </button>

            <div className="flex w-full justify-between text-sm">
              <a href="#" className="text-white hover:text-[#45f3ff] transition-colors">
                Forgot Password
              </a>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ff2770] font-semibold hover:text-[#45f3ff] transition-colors"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
