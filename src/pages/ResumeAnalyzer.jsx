import { useState } from "react";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resumeText.trim()) {
      alert("Please paste your resume content first.");
      return;
    }

    setLoading(true);
    setResult("");

    const prompt = `
You are CareerPilot AI, a professional resume analysis assistant.

Analyze the following student's resume:

---------------- RESUME ----------------
${resumeText}
------------------------------------------

Provide a practical resume analysis with these sections:

1. Resume Summary
2. Strengths
3. Skills Identified
4. Missing or Weak Skills
5. Projects Analysis
6. Experience Analysis
7. Education Analysis
8. Resume Improvements
9. ATS-Friendly Suggestions
10. Suggested Resume Keywords
11. Formatting Suggestions
12. Next 5 Improvements

Important:
- Do not invent experience, education or skills.
- Clearly distinguish between information present in the resume and suggestions.
- Keep the advice practical and student-friendly.
`;

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: prompt,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Resume analysis failed."
        );
      }

      setResult(data.reply);
    } catch (error) {
      console.error(error);

      setResult(
        "Sorry, resume analysis nahi ho pa raha. Please make sure the AI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearResume = () => {
    setResumeText("");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl">📄</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Resume Analyzer
          </h1>

          <p className="mt-2 text-slate-600">
            Paste your resume and get AI-powered suggestions
            to improve it.
          </p>
        </div>

        {/* Resume Input */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <form
            onSubmit={handleAnalyze}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                📋 Paste Your Resume
              </label>

              <textarea
                value={resumeText}
                onChange={(e) =>
                  setResumeText(e.target.value)
                }
                placeholder={`Example:

Priya Kumari
B.Tech Computer Science

Skills:
HTML, CSS, JavaScript, React, Python

Projects:
CareerPilot AI
Weather App

Education:
B.Tech Computer Science
`}
                rows="16"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "🤖 Analyzing Resume..."
                  : "Analyze My Resume 🚀"}
              </button>

              <button
                type="button"
                onClick={clearResume}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Clear
              </button>

            </div>

          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🤖</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Resume Analysis
                </h2>

                <p className="text-sm text-slate-500">
                  Personalized feedback by CareerPilot AI
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

export default ResumeAnalyzer;