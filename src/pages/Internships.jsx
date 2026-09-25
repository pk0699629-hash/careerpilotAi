import { useState } from "react";

function Internships() {
  const [career, setCareer] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!career.trim() || !skills.trim()) {
      alert("Please enter your target career and current skills.");
      return;
    }

    setLoading(true);
    setResult("");

    const prompt = `
You are CareerPilot AI, a student career and internship assistant.

Analyze this student's profile:

Target Career:
${career}

Current Skills:
${skills}

Experience / Projects:
${experience || "No experience provided"}

Suggest suitable internship directions and project ideas.

Give the response in these sections:

1. Student Profile Summary
2. Internship Roles to Target
3. Skills Required for These Roles
4. Project Ideas
5. Beginner-Friendly Project
6. Intermediate Project
7. Advanced Project
8. Portfolio Suggestions
9. Resume Suggestions
10. Internship Preparation Steps
11. Next 5 Actions

Important:
- Do not claim that a specific internship is currently available unless verified.
- Focus on suitable roles, skills, preparation and project ideas.
- Keep the suggestions practical for a student.
`;

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }

      setResult(data.reply);
    } catch (error) {
      console.error(error);

      setResult(
        "Sorry, internship suggestions generate nahi ho pa rahe. Please make sure the AI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl">💼</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Internship & Project Planner
          </h1>

          <p className="mt-2 text-slate-600">
            Discover suitable internship roles and projects based
            on your skills and career goal.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <form onSubmit={handleGenerate} className="space-y-6">

            {/* Career */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🎯 Target Career
              </label>

              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="Example: Web Developer"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                💻 Current Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Example: HTML, CSS, JavaScript, React"
                rows="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🚀 Projects / Experience
              </label>

              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Example: Built a portfolio website and a weather app"
                rows="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "🤖 Creating Suggestions..."
                : "Find Internship & Projects 🚀"}
            </button>

          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">💼</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Career Opportunities Plan
                </h2>

                <p className="text-sm text-slate-500">
                  Generated by CareerPilot AI
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {result}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Internships;