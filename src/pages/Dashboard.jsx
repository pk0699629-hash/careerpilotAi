import { Link } from "react-router-dom";

function FeatureCard({
  icon,
  title,
  description,
  button,
  to,
  wide = false,
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
        wide ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="text-4xl">{icon}</div>

      <h2 className="mt-4 text-xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 leading-7 text-slate-600">
        {description}
      </p>

      <Link
        to={to}
        className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
      >
        {button}
      </Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg md:p-10">

          <div className="max-w-3xl">
            <p className="font-semibold text-blue-100">
              🚀 Your AI Career Companion
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Welcome to CareerPilot AI
            </h1>

            <p className="mt-4 text-lg leading-8 text-blue-50">
              Discover your career path, analyze your skills,
              create personalized learning plans and prepare for
              your future career with AI.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
              >
                Build My Profile
              </Link>

              <Link
                to="/chatbot"
                className="rounded-lg border border-white/50 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Ask AI 🤖
              </Link>
            </div>
          </div>

        </div>

        {/* Section heading */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Your Career Toolkit 🧰
          </h2>

          <p className="mt-2 text-slate-600">
            Everything you need to plan and build your career.
          </p>
        </div>

        {/* Features */}
        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <FeatureCard
            icon="🎓"
            title="Student Profile"
            description="Create your profile and get personalized AI career guidance based on your education, skills and goals."
            button="Analyze My Profile"
            to="/profile"
          />

          <FeatureCard
            icon="🎯"
            title="Career Assessment"
            description="Discover your interests, strengths and suitable career options."
            button="Start Assessment"
            to="/assessment"
          />

          <FeatureCard
            icon="🤖"
            title="AI Career Recommendations"
            description="Explore different career paths and discover the skills required for each career."
            button="Explore Careers"
            to="/recommendations"
          />

          <FeatureCard
            icon="🧠"
            title="Skill Gap Analysis"
            description="Find out which skills you already have and which skills you need to develop."
            button="Analyze Skills"
            to="/skill-gap"
          />

          <FeatureCard
            icon="🗺️"
            title="Career Roadmap"
            description="Generate a personalized step-by-step roadmap from your current level to your target career."
            button="Create Roadmap"
            to="/roadmap"
          />

          <FeatureCard
            icon="📅"
            title="AI Study Planner"
            description="Generate a practical daily or weekly study plan according to your available time."
            button="Create Study Plan"
            to="/study-plan"
          />

          <FeatureCard
            icon="📚"
            title="Skills & Resources"
            description="Discover important skills, practice topics and learning resources for your target career."
            button="Find Resources"
            to="/resources"
          />

          <FeatureCard
            icon="💼"
            title="Internship & Projects"
            description="Get internship role ideas, project suggestions, portfolio guidance and preparation steps."
            button="Plan Internship"
            to="/internships"
          />

          <FeatureCard
            icon="📈"
            title="Progress Tracking"
            description="Track your learning progress and ask AI what you should focus on next."
            button="Track Progress"
            to="/progress"
          />

          <FeatureCard
            icon="📖"
            title="Courses & Learning"
            description="Explore courses and learning resources to improve your career skills."
            button="Explore Courses"
            to="/courses"
          />

          <FeatureCard
            icon="📄"
            title="Resume Analyzer"
            description="Analyze your resume and get AI-powered suggestions to improve your professional profile."
            button="Analyze Resume"
            to="/resume"
          />

          <FeatureCard
            icon="💬"
            title="CareerPilot AI Chatbot"
            description="Ask AI anything about careers, coding, studies, projects, writing and general knowledge."
            button="Open AI Chatbot"
            to="/chatbot"
            wide
          />

        </div>

        {/* Quick Journey */}
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-900">
            Your Career Journey 🚀
          </h2>

          <p className="mt-2 text-slate-600">
            Follow these steps to make the most of CareerPilot AI.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                1️⃣
              </div>

              <h3 className="mt-3 font-bold">
                Know Yourself
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Build your profile and complete the assessment.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                2️⃣
              </div>

              <h3 className="mt-3 font-bold">
                Choose Direction
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Explore careers and identify your skill gaps.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                3️⃣
              </div>

              <h3 className="mt-3 font-bold">
                Learn & Build
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Follow your roadmap, study plan and projects.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                4️⃣
              </div>

              <h3 className="mt-3 font-bold">
                Track & Grow
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Track progress and prepare for internships and jobs.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;