import { useState } from "react";

function SkillGap() {
  const [career, setCareer] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!career.trim() || !skills.trim()) {
      alert("Please enter your target career and current skills.");
      return;
    }

    setLoading(true);
    setResult("");

    const prompt = `
You are CareerPilot AI, a career guidance assistant.

Analyze the student's skill gap.

Target Career:
${career}

Current Skills:
${skills}

Provide the answer in these sections:

1. Target Career
2. Skills Already Known
3. Important Missing Skills
4. Skill Priority
5. What to Learn First
6. Recommended Projects
7. Suggested Learning Resources
8. Next Steps

Keep the explanation practical, student-friendly and clear.
Do not assume that the student knows skills that were not provided.
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
        throw new Error(data.error || "Skill analysis failed.");
      }

      setResult(data.reply);
    } catch (error) {
      console.error(error);

      setResult(
        "Sorry, skill gap analysis nahi ho pa raha. Please make sure the AI server is running."
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
          <div className="text-5xl">🧠</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Skill Gap Analysis
          </h1>

          <p className="mt-2 text-slate-600">
            Find out which skills you already have and which skills
            you need to develop.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <form onSubmit={handleAnalyze} className="space-y-6">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🎯 Target Career
              </label>

              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="Example: Full Stack Developer"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                💻 Your Current Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Example: HTML, CSS, JavaScript, Python"
                rows="5"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "🤖 Analyzing Skills..."
                : "Analyze Skill Gap 🚀"}
            </button>

          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🤖</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Skill Gap Report
                </h2>

                <p className="text-sm text-slate-500">
                  Personalized analysis by CareerPilot AI
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

export default SkillGap;