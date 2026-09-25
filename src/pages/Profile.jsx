import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    education: "",
    skills: "",
    interests: "",
    careerGoal: "",
    experience: "",
  });

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (
      !profile.education ||
      !profile.skills ||
      !profile.interests ||
      !profile.careerGoal
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setAnalysis("");

    const prompt = `
You are CareerPilot AI, a professional career guidance assistant.

Analyze this student's profile:

Education:
${profile.education}

Current Skills:
${profile.skills}

Interests:
${profile.interests}

Career Goal:
${profile.careerGoal}

Experience:
${profile.experience || "No experience provided"}

Give the student a clear analysis with these sections:

1. Profile Summary
2. Strengths
3. Current Skills
4. Skills to Improve
5. Suitable Career Paths
6. Recommended Learning Direction
7. Next 3 Steps

Keep the answer practical and easy for a student to understand.
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
        throw new Error(data.error || "Analysis failed.");
      }

      setAnalysis(data.reply);
    } catch (error) {
      console.error(error);

      setAnalysis(
        "Sorry, profile analysis nahi ho pa raha. Please make sure the AI server is running."
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
          <div className="text-5xl">🎓</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Student Profile Analysis
          </h1>

          <p className="mt-2 text-slate-600">
            Tell CareerPilot AI about yourself and get personalized
            career guidance.
          </p>
        </div>

        {/* Profile Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <form onSubmit={handleAnalyze} className="space-y-6">

            {/* Education */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🎓 Education *
              </label>

              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="Example: B.Tech Computer Science, 2nd Year"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                💻 Current Skills *
              </label>

              <textarea
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="Example: HTML, CSS, JavaScript, Python"
                rows="3"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                ❤️ Interests *
              </label>

              <textarea
                name="interests"
                value={profile.interests}
                onChange={handleChange}
                placeholder="Example: AI, Web Development, Data Science"
                rows="3"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Career Goal */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                🎯 Career Goal *
              </label>

              <input
                type="text"
                name="careerGoal"
                value={profile.careerGoal}
                onChange={handleChange}
                placeholder="Example: Become a Full Stack Developer"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                📈 Experience
              </label>

              <textarea
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                placeholder="Example: Completed 2 web development projects"
                rows="3"
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
                ? "🤖 Analyzing Profile..."
                : "Analyze My Profile 🚀"}
            </button>

          </form>
        </div>

        {/* Analysis */}
        {analysis && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🤖</span>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  CareerPilot AI Analysis
                </h2>

                <p className="text-sm text-slate-500">
                  Personalized analysis based on your profile
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {analysis}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;