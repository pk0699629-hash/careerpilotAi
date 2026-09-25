import { useState } from "react";

function Resources() {
  const [career, setCareer] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [currentSkills, setCurrentSkills] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!career.trim()) {
      alert("Please enter your target career.");
      return;
    }

    setLoading(true);
    setResult("");

    const prompt = `
You are CareerPilot AI, a student learning-resource assistant.

Target Career:
${career}

Current Level:
${level}

Current Skills:
${currentSkills || "Not provided"}

Create a practical learning resource guide.

Give the response in these sections:

1. Target Career
2. Essential Skills Required
3. Skills to Learn First
4. Programming / Technical Topics
5. Practice Topics
6. Project Ideas
7. Recommended Resource Types
8. Free Learning Resource Suggestions
9. Practice Platforms
10. Portfolio Ideas
11. Next 5 Learning Actions

Important:
- Clearly distinguish general resource recommendations from verified current links.
- Do not invent URLs.
- Focus on resources that are useful for students.
- Organize the learning order from beginner to advanced where appropriate.
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
          data.error || "Resource generation failed."
        );
      }

      setResult(data.reply);
    } catch (error) {
      console.error(error);

      setResult(
        "Sorry, learning resources generate nahi ho pa rahe. Please make sure the AI server is running."
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
          <div className="text-5xl">🔎</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Skills & Resources
          </h1>

          <p className="mt-2 text-slate-600">
            Discover the skills and learning resources needed for
            your target career.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <form
            onSubmit={handleGenerate}
            className="space-y-6"
          >

            {/* Career */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🎯 Target Career
              </label>

              <input
                type="text"
                value={career}
                onChange={(e) =>
                  setCareer(e.target.value)
                }
                placeholder="Example: Data Scientist"
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
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                💻 Current Skills
              </label>

              <textarea
                value={currentSkills}
                onChange={(e) =>
                  setCurrentSkills(e.target.value)
                }
                placeholder="Example: Python, Excel, Basic SQL"
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
                ? "🤖 Finding Resources..."
                : "Find Skills & Resources 🚀"}
            </button>

          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">📚</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Learning Guide
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

export default Resources;