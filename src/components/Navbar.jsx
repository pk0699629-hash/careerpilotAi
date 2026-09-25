import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white px-4 py-4 shadow-sm md:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          to={user ? "/" : "/login"}
          className="text-xl font-bold text-blue-600 md:text-2xl"
        >
          🚀 CareerPilot AI
        </Link>

        {/* Navigation */}
        {user ? (
          <div className="flex items-center gap-3 overflow-x-auto text-sm font-medium text-slate-700 md:gap-6 md:text-base">

            <Link
              to="/"
              className="whitespace-nowrap hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="whitespace-nowrap hover:text-blue-600"
            >
              Profile
            </Link>

            <Link
              to="/recommendations"
              className="whitespace-nowrap hover:text-blue-600"
            >
              Careers
            </Link>

            <Link
              to="/study-plan"
              className="hidden whitespace-nowrap hover:text-blue-600 md:block"
            >
              Study Plan
            </Link>

            <Link
              to="/progress"
              className="hidden whitespace-nowrap hover:text-blue-600 md:block"
            >
              Progress
            </Link>

            <Link
              to="/chatbot"
              className="whitespace-nowrap hover:text-blue-600"
            >
              AI Chatbot
            </Link>

            <button
              onClick={handleLogout}
              className="whitespace-nowrap rounded-lg bg-red-500 px-3 py-2 font-semibold text-white transition hover:bg-red-600 md:px-4"
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3 font-medium">

            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;