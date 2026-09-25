import { useLocation, useNavigate } from "react-router-dom";

function Learn() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;
  const career = location.state?.career;

  const learningData = {
    "HTML & CSS": {
      icon: "🌐",
      intro:
        "HTML creates the structure of a webpage, while CSS controls its appearance and layout.",
      lessons: [
        {
          title: "1. HTML Basics",
          content:
            "Learn headings, paragraphs, links, images, lists, tables and forms. HTML gives structure to a webpage.",
        },
        {
          title: "2. CSS Basics",
          content:
            "Learn selectors, colors, fonts, margins, padding, borders and backgrounds to style webpages.",
        },
        {
          title: "3. Flexbox",
          content:
            "Flexbox helps you arrange elements in rows or columns and create flexible layouts.",
        },
        {
          title: "4. CSS Grid",
          content:
            "CSS Grid is useful for creating two-dimensional layouts with rows and columns.",
        },
        {
          title: "5. Responsive Design",
          content:
            "Learn media queries and responsive layouts so your website works properly on mobile, tablet and desktop.",
        },
      ],
    },

    JavaScript: {
      icon: "💻",
      intro:
        "JavaScript is a programming language used to add logic and interactivity to websites.",
      lessons: [
        {
          title: "1. Variables",
          content:
            "Learn let, const and basic data types such as strings, numbers and booleans.",
        },
        {
          title: "2. Conditions",
          content:
            "Use if, else and switch to make decisions in your programs.",
        },
        {
          title: "3. Loops",
          content:
            "Learn for, while and for...of loops to repeat operations.",
        },
        {
          title: "4. Functions",
          content:
            "Functions allow you to organize reusable pieces of logic.",
        },
        {
          title: "5. DOM",
          content:
            "The DOM allows JavaScript to read and modify webpage elements dynamically.",
        },
      ],
    },

    React: {
      icon: "⚛️",
      intro:
        "React is a JavaScript library for building reusable and interactive user interfaces.",
      lessons: [
        {
          title: "1. Components",
          content:
            "Components are reusable UI building blocks. A React application is made from components.",
        },
        {
          title: "2. Props",
          content:
            "Props allow you to pass information from one component to another.",
        },
        {
          title: "3. State",
          content:
            "State stores information that can change while the application is running.",
        },
        {
          title: "4. Hooks",
          content:
            "Hooks such as useState and useEffect allow functional components to use state and lifecycle features.",
        },
        {
          title: "5. React Router",
          content:
            "React Router allows you to create multiple pages and navigation in a React application.",
        },
      ],
    },

    "Python Programming": {
      icon: "🐍",
      intro:
        "Python is a beginner-friendly programming language widely used in web development, data science and AI.",
      lessons: [
        {
          title: "1. Python Basics",
          content:
            "Learn variables, data types, input, output and basic Python syntax.",
        },
        {
          title: "2. Conditions",
          content:
            "Use if, elif and else to control program decisions.",
        },
        {
          title: "3. Loops",
          content:
            "Use for and while loops to repeat operations.",
        },
        {
          title: "4. Functions",
          content:
            "Functions make Python programs organized and reusable.",
        },
        {
          title: "5. Object-Oriented Programming",
          content:
            "Learn classes, objects, methods and basic concepts of OOP.",
        },
      ],
    },

    "Data Science": {
      icon: "📊",
      intro:
        "Data Science combines programming, statistics and data analysis to discover useful insights from data.",
      lessons: [
        {
          title: "1. Python for Data Science",
          content:
            "Learn Python syntax and libraries commonly used for data analysis.",
        },
        {
          title: "2. NumPy",
          content:
            "NumPy provides powerful tools for numerical calculations and arrays.",
        },
        {
          title: "3. Pandas",
          content:
            "Pandas is used to load, clean, transform and analyze datasets.",
        },
        {
          title: "4. Data Visualization",
          content:
            "Learn charts and graphs using libraries such as Matplotlib and Seaborn.",
        },
        {
          title: "5. Statistics",
          content:
            "Understand averages, distributions, correlation and other basic statistical concepts.",
        },
      ],
    },

    "Machine Learning": {
      icon: "🤖",
      intro:
        "Machine Learning allows computers to learn patterns from data and make predictions.",
      lessons: [
        {
          title: "1. Machine Learning Basics",
          content:
            "Understand datasets, features, labels, training data and testing data.",
        },
        {
          title: "2. Regression",
          content:
            "Regression models are used to predict numerical values.",
        },
        {
          title: "3. Classification",
          content:
            "Classification models predict categories such as yes/no or different classes.",
        },
        {
          title: "4. Model Evaluation",
          content:
            "Learn metrics such as accuracy, precision, recall and error measurements.",
        },
        {
          title: "5. Scikit-learn",
          content:
            "Scikit-learn provides practical tools for preprocessing, training and evaluating machine learning models.",
        },
      ],
    },

    "UI/UX Design": {
      icon: "🎨",
      intro:
        "UI/UX design focuses on creating digital products that are visually appealing and easy to use.",
      lessons: [
        {
          title: "1. Design Principles",
          content:
            "Learn hierarchy, alignment, contrast, spacing and consistency.",
        },
        {
          title: "2. Wireframes",
          content:
            "Wireframes help you plan the structure and layout of a digital product.",
        },
        {
          title: "3. Figma",
          content:
            "Figma can be used to create interfaces, components and prototypes.",
        },
        {
          title: "4. User Research",
          content:
            "Learn how to understand user needs, problems and expectations.",
        },
        {
          title: "5. Prototyping",
          content:
            "Create interactive prototypes to test user flows before development.",
        },
      ],
    },

    "Digital Marketing": {
      icon: "📱",
      intro:
        "Digital Marketing uses online channels to reach audiences and promote products, services or content.",
      lessons: [
        {
          title: "1. SEO",
          content:
            "Learn how search engines discover and rank useful content.",
        },
        {
          title: "2. Social Media",
          content:
            "Understand content creation, audience engagement and social media strategy.",
        },
        {
          title: "3. Content Marketing",
          content:
            "Learn how useful content can attract and engage a target audience.",
        },
        {
          title: "4. Email Marketing",
          content:
            "Understand newsletters, audience segmentation and email campaigns.",
        },
        {
          title: "5. Analytics",
          content:
            "Learn how to use data to understand traffic, engagement and campaign performance.",
        },
      ],
    },

    "Cybersecurity Fundamentals": {
      icon: "🔐",
      intro:
        "Cybersecurity focuses on protecting systems, networks and information from security threats.",
      lessons: [
        {
          title: "1. Networking Basics",
          content:
            "Understand IP addresses, networks, protocols and how devices communicate.",
        },
        {
          title: "2. Security Basics",
          content:
            "Learn concepts such as confidentiality, integrity, availability and authentication.",
        },
        {
          title: "3. Linux",
          content:
            "Learn basic Linux commands and understand the Linux environment.",
        },
        {
          title: "4. Common Threats",
          content:
            "Study common security threats such as phishing, malware and weak passwords.",
        },
        {
          title: "5. Authentication",
          content:
            "Understand passwords, multi-factor authentication and secure access principles.",
        },
      ],
    },
  };

  let title = "";
  let icon = "📚";
  let intro = "";
  let lessons = [];

  if (course) {
    title = course.title;
    icon = course.icon;
    intro =
      learningData[course.title]?.intro ||
      course.description;

    lessons =
      learningData[course.title]?.lessons ||
      course.topics.map((topic, index) => ({
        title: `${index + 1}. ${topic}`,
        content: `Study the fundamentals of ${topic} and practice it with small exercises or projects.`,
      }));
  } else if (career) {
    title = `${career.title} Learning Guide`;
    icon = career.icon;

    intro = `This learning guide will help you understand the important skills required for becoming a ${career.title}.`;

    lessons = career.skills.map((skill, index) => ({
      title: `${index + 1}. ${skill}`,
      content: `Start learning ${skill}, practice the fundamentals and build a small project using this skill.`,
    }));
  } else {
    title = "Learning Center";
    intro =
      "Select a course from the Courses page to start learning.";
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

          <div className="text-6xl">
            {icon}
          </div>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {intro}
          </p>

        </div>

        {/* Lessons */}
        {lessons.length > 0 && (
          <div className="mt-8 space-y-5">

            {lessons.map((lesson) => (
              <div
                key={lesson.title}
                className="rounded-2xl bg-white p-7 shadow-md"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {lesson.title}
                </h2>

                <p className="mt-3 leading-8 text-slate-600">
                  {lesson.content}
                </p>

                <div className="mt-5 rounded-xl bg-blue-50 p-4">
                  <p className="font-semibold text-blue-800">
                    💡 Practice Tip
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Practice this topic by creating a small
                    example or project. Hands-on practice will
                    help you understand the concept better.
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* Empty state */}
        {lessons.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-md">
            <div className="text-5xl">📚</div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Choose a course to start learning
            </h2>

            <p className="mt-2 text-slate-600">
              Go to Courses and select any course.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <button
            onClick={() => navigate("/courses")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Courses
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Track My Progress 📈
          </button>

        </div>

      </div>
    </div>
  );
}

export default Learn;