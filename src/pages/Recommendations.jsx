import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recommendations() {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState(null);

  const careers = [
    {
      title: "Software Developer",
      icon: "💻",
      description:
        "Build websites, applications and software using programming.",
      skills: ["JavaScript", "React", "Python", "Problem Solving"],
    },
    {
      title: "Data Scientist",
      icon: "📊",
      description:
        "Analyze data and use machine learning to solve real-world problems.",
      skills: ["Python", "Pandas", "Machine Learning", "Statistics"],
    },
    {
      title: "UI/UX Designer",
      icon: "🎨",
      description:
        "Design attractive and user-friendly digital products.",
      skills: ["Figma", "UI Design", "UX Research", "Creativity"],
    },
    {
      title: "Digital Marketer",
      icon: "📱",
      description:
        "Help businesses grow through online marketing and social media.",
      skills: ["SEO", "Social Media", "Content", "Analytics"],
    },
    {
      title: "Cybersecurity Analyst",
      icon: "🔐",
      description:
        "Protect computers, networks and data from security threats.",
      skills: ["Networking", "Security", "Linux", "Problem Solving"],
    },
    {
      title: "AI/ML Engineer",
      icon: "🤖",
      description:
        "Build intelligent systems using artificial intelligence and machine learning.",
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Mathematics",
      ],
    },
  ];

  const handleLearn = () => {
    if (!selectedCareer) return;

    navigate("/learn", {
      state: {
        career: selectedCareer,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            AI Career Recommendations 🤖
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Explore career options and start learning the skills
            required for your career.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <div
              key={career.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">
                {career.icon}
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                {career.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {career.description}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold text-slate-800">
                  Key Skills:
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCareer(career)}
                className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View Career
              </button>
            </div>
          ))}
        </div>

        {selectedCareer && (
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">

            <div className="flex items-center gap-4">
              <span className="text-5xl">
                {selectedCareer.icon}
              </span>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {selectedCareer.title}
                </h2>

                <p className="mt-1 text-slate-600">
                  Start your learning journey
                </p>
              </div>
            </div>

            <p className="mt-6 text-lg leading-7 text-slate-600">
              {selectedCareer.description}
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-slate-900">
                Important Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCareer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={handleLearn}
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Learn Now 📚
              </button>

              <button
                onClick={() => setSelectedCareer(null)}
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Recommendations;