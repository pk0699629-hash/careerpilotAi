import { useState } from "react";

function Assessment() {
  const questions = [
    {
      question: "Which activity do you enjoy the most?",
      options: [
        "Building websites or apps",
        "Analyzing data and solving problems",
        "Designing creative things",
        "Helping and communicating with people",
      ],
    },
    {
      question: "Which subject interests you the most?",
      options: [
        "Computer Science",
        "Mathematics",
        "Design / Arts",
        "Business / Communication",
      ],
    },
    {
      question: "What type of work do you prefer?",
      options: [
        "Technical and logical work",
        "Research and analysis",
        "Creative work",
        "Communication and teamwork",
      ],
    },
    {
      question: "Which skill would you like to develop?",
      options: [
        "Programming",
        "Data Analysis",
        "UI/UX Design",
        "Marketing / Communication",
      ],
    },
    {
      question: "What kind of career environment do you prefer?",
      options: [
        "Technology company",
        "Research / Data environment",
        "Creative studio",
        "Business environment",
      ],
    },
  ];

  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];

    updatedAnswers[index] = answer;

    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answers.some((answer) => !answer)) {
      alert("Please answer all questions.");
      return;
    }

    setLoading(true);
    setResult("");

    const assessmentData = questions
      .map(
        (question, index) =>
          `${question.question}\nAnswer: ${answers[index]}`
      )
      .join("\n\n");

    const prompt = `
You are CareerPilot AI, a professional career guidance assistant.

Analyze this student's career assessment.

${assessmentData}

Provide a clear and practical career analysis with these sections:

1. Assessment Summary
2. Main Interests
3. Strengths
4. Suitable Career Paths
5. Recommended Career Direction
6. Important Skills to Learn
7. Suggested Projects
8. Learning Direction
9. Next 3 Actions

Important:
- Base the analysis only on the student's answers.
- Do not claim that one career is guaranteed to be perfect.
- Explain why the suggested career paths match the answers.
- Keep the explanation simple and student-friendly.
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
          data.error || "Assessment analysis failed."
        );
      }

      setResult(data.reply);
    } catch (error) {
      console.error(error);

      setResult(
        "Sorry, assessment analysis nahi ho pa raha. Please make sure the AI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setAnswers(Array(questions.length).fill(""));
    setResult("");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl">🎯</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            AI Career Assessment
          </h1>

          <p className="mt-2 text-slate-600">
            Answer a few questions and let CareerPilot AI analyze
            your interests and career direction.
          </p>
        </div>

        {/* Questions */}
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {questions.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-5"
              >

                <div className="flex gap-3">
                  <span className="font-bold text-blue-600">
                    Q{index + 1}.
                  </span>

                  <h2 className="font-semibold text-slate-900">
                    {item.question}
                  </h2>
                </div>

                <div className="mt-4 space-y-3">

                  {item.options.map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                        answers[index] === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() =>
                          handleAnswer(index, option)
                        }
                        className="h-4 w-4"
                      />

                      <span className="text-slate-700">
                        {option}
                      </span>
                    </label>
                  ))}

                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "🤖 Analyzing Your Answers..."
                : "Get My Career Analysis 🚀"}
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
                  Your AI Career Analysis
                </h2>

                <p className="text-sm text-slate-500">
                  Based on your assessment answers
                </p>
              </div>
            </div>

            <div className="whitespace-pre-line leading-8 text-slate-700">
              {result}
            </div>

            <button
              onClick={resetAssessment}
              className="mt-6 rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Retake Assessment 🔄
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Assessment;