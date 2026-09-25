import { useState } from "react";

function Roadmap() {
  const [career, setCareer] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [time, setTime] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!career.trim() || !time.trim()) {
      alert("Please enter your career goal and available study time.");
      return;
    }

    setLoading(true);
    setRoadmap("");

    const prompt = `
You are CareerPilot AI, a professional career planning assistant.

Create a personalized learning roadmap for a student.

Target Career:
${career}

Current Level:
${level}

Available Study Time:
${time}

Create a practical roadmap with these sections:

1. Career Goal
2. Starting Level
3. Phase 1 - Foundation
4. Phase 2 - Core Skills
5. Phase 3 - Advanced Skills
6. Phase 4 - Real Projects
7. Phase 5 - Portfolio and Resume
8. Phase 6 - Internship / Job Preparation
9. Recommended Projects
10. Expected Timeline
11. Weekly Study Strategy
12. Next 3 Actions

For every phase, mention what the student should learn and what they should build.

Keep the roadmap realistic, clear and beginner-friendly.
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
        throw new Error(data.error || "Roadmap generation failed.");
      }

      setRoadmap(data.reply);
    } catch (error) {
      console.error(error);

      setRoadmap(
        "Sorry, roadmap generate nahi ho pa raha. Please make sure the AI server is running."
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
          <div className="text-5xl">🗺️</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Career Roadmap
          </h1>

          <p className="mt-2 text-slate-600">
            Generate a personalized step-by-step path toward your
            career goal.
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
                placeholder="Example: AI/ML Engineer"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Level */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                📊 Current Level
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                ⏰ Available Study Time
              </label>

              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Example: 2 hours per day"
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
                ? "🤖 Creating Roadmap..."
                : "Generate My Roadmap 🚀"}
            </button>

          </form>
        </div>

        {/* Roadmap Result */}
        {roadmap && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🗺️</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Personalized Roadmap
                </h2>

                <p className="text-sm text-slate-500">
                  Generated by CareerPilot AI
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {roadmap}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Roadmap;