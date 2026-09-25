import { useState } from "react";

function StudyPlan() {
  const [career, setCareer] = useState("");
  const [skills, setSkills] = useState("");
  const [hours, setHours] = useState("");
  const [duration, setDuration] = useState("1 week");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!career.trim() || !hours.trim()) {
      alert("Please enter your career goal and available study time.");
      return;
    }

    setLoading(true);
    setPlan("");

    const prompt = `
You are CareerPilot AI, a personalized student study planning assistant.

Create a practical ${duration} study plan.

Student's Target Career:
${career}

Current Skills:
${skills || "Not provided"}

Available Study Time:
${hours}

Create the plan with:

1. Goal for this period
2. Daily learning schedule
3. Topics to study
4. Practice activities
5. Project work
6. Revision time
7. Weekly milestone
8. Expected outcome
9. Progress checklist
10. What to do next after completing the plan

Make the plan realistic for a student.
Balance learning, practice, projects and revision.
Use clear Day 1, Day 2, etc. format when appropriate.
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
        throw new Error(data.error || "Study plan generation failed.");
      }

      setPlan(data.reply);
    } catch (error) {
      console.error(error);

      setPlan(
        "Sorry, study plan generate nahi ho pa raha. Please make sure the AI server is running."
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
          <div className="text-5xl">📅</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Study Planner
          </h1>

          <p className="mt-2 text-slate-600">
            Get a personalized daily and weekly learning plan.
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
                placeholder="Example: Data Scientist"
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
                placeholder="Example: Python, Excel, Basic SQL"
                rows="3"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Hours */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                ⏰ Study Time
              </label>

              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Example: 2 hours per day"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                📆 Plan Duration
              </label>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>1 week</option>
                <option>2 weeks</option>
                <option>1 month</option>
              </select>
            </div>

            {/* Generate */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "🤖 Creating Study Plan..."
                : "Generate My Study Plan 🚀"}
            </button>

          </form>
        </div>

        {/* Result */}
        {plan && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">📅</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your AI Study Plan
                </h2>

                <p className="text-sm text-slate-500">
                  Personalized by CareerPilot AI
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {plan}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default StudyPlan;