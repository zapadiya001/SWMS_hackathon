import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Repeat,
  BookOpenCheck,
  GaugeCircle,
  TimerReset,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

const ResultPage = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResult = async () => {
    try {
      const res = await fetch(`http://localhost:9705/userQuizResult/${resultId}`);
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      console.error("Failed to fetch result:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  if (loading) {
    return (
      <p className="text-center text-white text-lg mt-10 animate-pulse">
        ⏳ Loading result...
      </p>
    );
  }

  if (!result) {
    return <p className="text-center text-red-500 mt-10">❌ No result found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* 🔘 Action Buttons (Top) */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <button
            onClick={() => navigate(`/quiz/${result.quiz._id}/attempt`)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <Repeat size={18} /> Improve Your Score
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <BookOpenCheck size={18} /> Try a Different Quiz
          </button>
        </div>

        {/* 🏆 Quiz Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          📊 Quiz Result
        </h1>

        {/* 📋 Quiz Summary Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">📝 Quiz</h2>
            <p className="text-white/80 mt-1">{result.quiz?.title || "Untitled Quiz"}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">📌 Attempt #</h2>
            <p className="text-white/80 mt-1">{result.attemptNumber}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">🎯 Score</h2>
            <p className="text-white/80 mt-1">
              {result.score} / {result.totalQuestions}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">✅ Correct Answers</h2>
            <p className="text-white/80 mt-1">{result.correctAnswers}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">📈 Percentage</h2>
            <p className="text-white/80 mt-1">
              {((result.correctAnswers / result.totalQuestions) * 100).toFixed(2)}%
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">⏱ Time Spent</h2>
            <p className="text-white/80 mt-1">{formatTime(result.timeSpent || 0)}</p>
          </div>
        </div>

        {/* 🧠 Question Breakdown */}
        <h3 className="text-3xl font-semibold mb-6 text-center">
          🧠 Detailed Question-wise Breakdown
        </h3>
        <div className="space-y-6">
          {result.answers.map((ans, i) => {
            const question = ans.question;
            const options = question?.options || [];
            const correctOption =
              typeof question?.correctOption === "string"
                ? options[question.correctOption.charCodeAt(0) - 97]
                : "Unknown";
            const selectedOption =
              ans.selectedOptionIndex >= 0
                ? options[ans.selectedOptionIndex]
                : "Not Attempted";

            return (
              <div
                key={ans._id || i}
                className="bg-white/5 border border-white/10 p-5 rounded-xl shadow"
              >
                <p className="font-semibold mb-2">
                  Q{i + 1}: {question?.questionText || "Unknown Question"}
                </p>
                <p className="text-sm mb-1">✅ Correct Option: {correctOption}</p>
                <p className="text-sm mb-1">📝 Your Answer: {selectedOption}</p>
                <p className="text-sm">
                  {ans.isCorrect ? "✅ Correct" : "❌ Incorrect"} | Marks:{" "}
                  {ans.marksAwarded}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔘 Action Buttons (Bottom) */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate(`/quiz/${result.quiz._id}/attempt`)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <Repeat size={18} /> Retake Quiz
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <BookOpenCheck size={18} /> New Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <ArrowLeftCircle size={18} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
