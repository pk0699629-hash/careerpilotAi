import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Courses from "./pages/Courses";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Chatbot from "./pages/Chatbot";
import Learn from "./pages/Learn";

import Profile from "./pages/Profile";
import StudyPlan from "./pages/StudyPlan";
import Internships from "./pages/Internships";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";


function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl">🚀</div>

          <p className="mt-3 text-lg font-semibold text-blue-600">
            Checking login...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function About() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-lg">

        <div className="text-6xl">
          🚀
        </div>

        <h1 className="mt-5 text-4xl font-bold text-slate-900">
          About CareerPilot AI
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          CareerPilot AI is an intelligent career guidance
          platform designed to help students discover suitable
          career paths, analyze their skills, create personalized
          roadmaps and study plans, prepare for internships and
          improve their resumes.
        </p>

        <div className="mt-8 grid gap-4 text-left md:grid-cols-2">

          <div className="rounded-xl bg-blue-50 p-5">
            <h2 className="font-bold text-blue-700">
              🎯 Career Discovery
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore careers based on your interests, skills and
              goals.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-5">
            <h2 className="font-bold text-green-700">
              🤖 AI Guidance
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Get personalized suggestions using AI.
            </p>
          </div>

          <div className="rounded-xl bg-purple-50 p-5">
            <h2 className="font-bold text-purple-700">
              📚 Learning
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow learning plans, courses and resources.
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-5">
            <h2 className="font-bold text-orange-700">
              💼 Career Preparation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prepare your resume, projects and internship plan.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-gap"
          element={
            <ProtectedRoute>
              <SkillGap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        {/* New AI Features */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study-plan"
          element={
            <ProtectedRoute>
              <StudyPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/internships"
          element={
            <ProtectedRoute>
              <Internships />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />


        {/* Unknown Route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;