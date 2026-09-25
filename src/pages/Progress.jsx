import { useState } from "react";

function Progress() {
  const [skills, setSkills] = useState([
    { name: "HTML & CSS", status: "completed" },
    { name: "JavaScript", status: "learning" },
    { name: "React", status: "not-started" },
    { name: "Python", status: "not-started" },
    { name: "Projects", status: "not-started" },
  ]);

  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = (index, status) => {
    setSkills((previousSkills) =>
      previousSkills.map((skill, i) =>
        i === index
          ? { ...skill, status }
          : skill
      )
    );
  };

  const completedCount = skills.filter(
    (skill) => skill.status === "completed"
  ).length;

  const progressPercentage = Math.round(
    (completedCount / skills.length) * 100
  );

  const handleAIUpdate = async () => {
    if (!goal.trim()) {
      alert("Please enter your career goal.");
      return;
    }

    setLoading(true);
    setProgress("");

    const skillDetails = skills
      .map(
        (skill) =>
          `${skill.name}: ${skill.status}`
      )
      .join("\n");

    const prompt = `
You are CareerPilot AI, a personalized career progress assistant.

Student Career Goal:
${goal}

Current Skill Progress:
${skillDetails}

Analyze the student's current progress and provide:

1. Progress Summary
2. Completed Skills
3. Skills Currently Being Learned
4. Skills Still Pending
5. What the Student Should Learn Next
6. Recommended Practice
7. Recommended Project
8. Updated Weekly Plan
9. Next 3 Actions

If the student has completed a skill, do not ask them to learn it again.
Focus on the next useful step based on their current progress.
Keep the advice practical and student-friendly.
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
          data.error || "Progress analysis failed."
        );
      }

      setProgress(data.reply);
    } catch (error) {
      console.error(error);

      setProgress(
        "Sorry, progress update generate nahi ho pa raha. Please make sure the AI server is running."
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
          <div className="text-5xl">📈</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            My Learning Progress
          </h1>

          <p className="mt-2 text-slate-600">
            Track your skills and let AI update your next steps.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Overall Progress
              </h2>

              <p className="mt-1 text-slate-500">
                {completedCount} of {skills.length} skills completed
              </p>
            </div>

            <div className="text-4xl font-bold text-blue-600">
              {progressPercentage}%
            </div>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

        </div>

        {/* Skills */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-900">
            Your Skills
          </h2>

          <div className="mt-6 space-y-4">

            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <h3 className="font-semibold text-slate-800">
                    {skill.name}
                  </h3>

                  <select
                    value={skill.status}
                    onChange={(e) =>
                      updateStatus(
                        index,
                        e.target.value
                      )
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  >
                    <option value="not-started">
                      Not Started
                    </option>

                    <option value="learning">
                      Learning
                    </option>

                    <option value="completed">
                      Completed
                    </option>
                  </select>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* AI Update */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-900">
            🔄 Update My AI Plan
          </h2>

          <p className="mt-2 text-slate-600">
            Tell AI your career goal and it will suggest what
            you should focus on next.
          </p>

          <input
            type="text"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            placeholder="Example: Become a Full Stack Developer"
            className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            onClick={handleAIUpdate}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "🤖 Updating Plan..."
              : "Update My AI Plan 🚀"}
          </button>

        </div>

        {/* AI Result */}
        {progress && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🤖</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Updated AI Plan
                </h2>

                <p className="text-sm text-slate-500">
                  Based on your current progress
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {progress}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Progress;