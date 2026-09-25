import { useState } from "react";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();

    const text = question.trim();

    if (!text || loading) return;

    // User message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        type: "user",
        text: text,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // AI response
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: "Sorry, AI response nahi aa pa raha. Please check that the AI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setQuestion(text);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl">🤖</div>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            CareerPilot AI
          </h1>

          <p className="mt-2 text-slate-600">
            Ask me anything — career, coding, studies and more.
          </p>
        </div>

        {/* Chat Box */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Chat Header */}
          <div className="flex items-center justify-between bg-slate-900 px-6 py-4">
            <div>
              <h2 className="font-bold text-white">
                AI Assistant 💬
              </h2>

              <p className="text-sm text-slate-300">
                Powered by AI
              </p>
            </div>

            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
              >
                Clear Chat
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="min-h-[400px] max-h-[500px] space-y-4 overflow-y-auto p-6">

            {messages.length === 0 ? (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="max-w-lg text-center">

                  <div className="text-6xl">👋</div>

                  <h3 className="mt-4 text-2xl font-bold text-slate-900">
                    Hello! I'm CareerPilot AI
                  </h3>

                  <p className="mt-3 text-slate-600">
                    Ask me anything. I can help with careers,
                    programming, studies, writing, general knowledge
                    and many other topics.
                  </p>

                  <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">

                    <button
                      onClick={() =>
                        handleSuggestion("What is artificial intelligence?")
                      }
                      className="rounded-xl border border-slate-200 p-4 hover:bg-blue-50"
                    >
                      🤖 What is AI?
                    </button>

                    <button
                      onClick={() =>
                        handleSuggestion("How can I learn programming?")
                      }
                      className="rounded-xl border border-slate-200 p-4 hover:bg-blue-50"
                    >
                      💻 Learn programming
                    </button>

                    <button
                      onClick={() =>
                        handleSuggestion("What career is best for a student interested in technology?")
                      }
                      className="rounded-xl border border-slate-200 p-4 hover:bg-blue-50"
                    >
                      🎯 Career guidance
                    </button>

                    <button
                      onClick={() =>
                        handleSuggestion("Write a short motivational story")
                      }
                      className="rounded-xl border border-slate-200 p-4 hover:bg-blue-50"
                    >
                      ✍️ Write a story
                    </button>

                  </div>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <p className="mb-1 text-xs font-semibold opacity-70">
                      {message.type === "user"
                        ? "You"
                        : "CareerPilot AI"}
                    </p>

                    <p className="whitespace-pre-line leading-7">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-5 py-3 text-slate-600">
                  🤖 Thinking...
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="border-t bg-slate-50 p-4">

            <form
              onSubmit={handleAsk}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />

              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Send 🚀"}
              </button>
            </form>

            <p className="mt-2 text-center text-xs text-slate-500">
              Ask about anything — careers, coding, studies,
              general knowledge, writing and more.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;