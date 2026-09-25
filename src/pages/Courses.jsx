import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const courses = [
    {
      title: "HTML & CSS",
      category: "Web Development",
      level: "Beginner",
      icon: "🌐",
      description:
        "Learn the fundamentals of web pages, layouts, styling and responsive design.",
      topics: [
        "HTML Basics",
        "CSS Basics",
        "Flexbox",
        "Grid",
        "Responsive Design",
      ],
    },
    {
      title: "JavaScript",
      category: "Web Development",
      level: "Beginner",
      icon: "💻",
      description:
        "Learn programming fundamentals and make websites interactive.",
      topics: [
        "Variables",
        "Functions",
        "Arrays",
        "Objects",
        "DOM",
      ],
    },
    {
      title: "React",
      category: "Web Development",
      level: "Intermediate",
      icon: "⚛️",
      description:
        "Build modern user interfaces using React components and hooks.",
      topics: [
        "Components",
        "Props",
        "State",
        "Hooks",
        "React Router",
      ],
    },
    {
      title: "Python Programming",
      category: "Programming",
      level: "Beginner",
      icon: "🐍",
      description:
        "Learn Python programming from basics to practical problem solving.",
      topics: [
        "Variables",
        "Conditions",
        "Loops",
        "Functions",
        "OOP",
      ],
    },
    {
      title: "Data Science",
      category: "Data Science",
      level: "Intermediate",
      icon: "📊",
      description:
        "Learn how to work with data and discover useful insights.",
      topics: [
        "Python",
        "Pandas",
        "NumPy",
        "Data Visualization",
        "Statistics",
      ],
    },
    {
      title: "Machine Learning",
      category: "AI & ML",
      level: "Intermediate",
      icon: "🤖",
      description:
        "Understand machine learning concepts and build predictive models.",
      topics: [
        "ML Basics",
        "Regression",
        "Classification",
        "Model Evaluation",
        "Scikit-learn",
      ],
    },
    {
      title: "UI/UX Design",
      category: "Design",
      level: "Beginner",
      icon: "🎨",
      description:
        "Learn how to design attractive and user-friendly digital products.",
      topics: [
        "Design Principles",
        "Wireframes",
        "Figma",
        "User Research",
        "Prototyping",
      ],
    },
    {
      title: "Digital Marketing",
      category: "Marketing",
      level: "Beginner",
      icon: "📱",
      description:
        "Learn the fundamentals of digital marketing and online growth.",
      topics: [
        "SEO",
        "Social Media",
        "Content Marketing",
        "Email Marketing",
        "Analytics",
      ],
    },
    {
      title: "Cybersecurity Fundamentals",
      category: "Cybersecurity",
      level: "Beginner",
      icon: "🔐",
      description:
        "Understand basic cybersecurity concepts and how systems are protected.",
      topics: [
        "Networking",
        "Security Basics",
        "Linux",
        "Threats",
        "Authentication",
      ],
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "Programming",
    "Data Science",
    "AI & ML",
    "Design",
    "Marketing",
    "Cybersecurity",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      course.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      course.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleLearn = (course) => {
    navigate("/learn", {
      state: {
        course,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="text-5xl">📚</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Courses & Learning
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Learn the skills you need for your career with
            structured topics and practical learning.
          </p>
        </div>

        {/* Search */}
        <div className="rounded-2xl bg-white p-6 shadow-md">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 Search courses..."
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Categories */}
          <div className="mt-5 flex flex-wrap gap-2">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        </div>

        {/* Course Count */}
        <div className="mt-8">
          <p className="font-medium text-slate-600">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Courses */}
        {filteredCourses.length > 0 ? (
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredCourses.map((course) => (
              <div
                key={course.title}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-center justify-between">
                  <span className="text-5xl">
                    {course.icon}
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {course.level}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {course.title}
                </h2>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {course.category}
                </p>

                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {course.description}
                </p>

                <div className="mt-5">
                  <h3 className="font-semibold text-slate-800">
                    Topics
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleLearn(course)}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Learn Now 📖
                </button>

              </div>
            ))}

          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-md">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              No courses found
            </h2>

            <p className="mt-2 text-slate-600">
              Try another search or select a different category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Courses;