import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");   
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;
      if (isLoginMode) {
        // Login: no toast, just navigate
        res = await fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          navigate("/dashboard");
        } else {
          // Optional: you could show an inline error below the input if needed
          setToastMessage(`Error: ${data.detail || data}`);
          setToastType("error");
          setTimeout(() => setToastMessage(null), 3000);
        }
      } else {
        // Signup: show toast only for signup
        res = await fetch("http://127.0.0.1:8000/signUp/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, hashPassword: password }),
        });
        const data = await res.json();
        if (res.ok) {
          showToast("Sign up successful! You can now login.", "success");
          setIsLoginMode(true);
        } else {
          showToast(`Error: ${data.detail || data}`, "error");
        }
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!isLoginMode) showToast("Server error: " + err, "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-serif p-4">
      {/* Toast (only shows on signup) */}
      {toastMessage && !isLoginMode && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium z-50 ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          } animate-fadeIn`}
        >
          {toastMessage}
        </div>
      )}

      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>

        {/* Toggle */}
        <div className="relative flex h-14 mb-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-primary transition-all duration-300 ${
              !isLoginMode ? "translate-x-full" : "translate-x-0"
            } rounded-full`}
          ></div>
          <button
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 z-10 text-xl font-semibold transition-all ${
              isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 z-10 text-xl font-semibold transition-all ${
              !isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-4 text-white text-lg font-semibold hover:bg-primary/90 transition"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-gray-600 text-lg">
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              className="text-primary font-semibold ml-1 hover:underline"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? "Sign Up now" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
