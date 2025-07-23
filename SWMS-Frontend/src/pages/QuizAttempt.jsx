"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import { AlertTriangle } from "lucide-react"; // Import icons for the alert

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get user ID from localStorage

  // State for custom incomplete quiz alert
  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  const [incompleteAlertMessage, setIncompleteAlertMessage] = useState("");

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        `http://localhost:9705/quizQuestions/by-quiz/${quizId}`
      );
      const data = await res.json();
      setQuestions(data.data);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleAnswer = (questionId, selectedOption) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const getOptionClass = (q, opt) => {
    const selected = selectedAnswers[q._id];
    if (!selected) return "bg-white/10 hover:bg-white/20";
    if (
      selected === q.correctOption &&
      opt === q.options[q.correctOption.charCodeAt(0) - 97]
    )
      return "bg-green-600 text-white";
    if (
      selected !== q.correctOption &&
      opt === q.options[selected.charCodeAt(0) - 97]
    )
      return "bg-red-600 text-white";
    if (opt === q.options[q.correctOption.charCodeAt(0) - 97])
      return "bg-green-600 text-white";
    return "bg-white/10";
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;

    if (answeredCount < totalQuestions) {
      setIncompleteAlertMessage(
        `You must answer all ${totalQuestions} questions before submitting the quiz.`
      );
      setShowIncompleteAlert(true);
      return;
    }

    try {
      // Step 1: Get next attempt number
      const attemptRes = await fetch(
        `http://localhost:9705/userQuizResult/next-attempt/${userId}/${quizId}`
      );
      const attemptData = await attemptRes.json();
      const attemptNumber = attemptData.nextAttempt || 1;

      // Step 2: Evaluate answers
      const evaluatedAnswers = questions.map((q) => {
        const selectedOption = selectedAnswers[q._id];
        const correctOption = q.correctOption;
        const isCorrect = selectedOption === correctOption;
        const marksAwarded = isCorrect ? q.marks || 1 : 0;
        return {
          question: q._id,
          selectedOptionIndex: selectedOption
            ? selectedOption.charCodeAt(0) - 97
            : -1,
          isCorrect,
          marksAwarded,
        };
      });

      const correctAnswers = evaluatedAnswers.filter((a) => a.isCorrect).length;
      const score = evaluatedAnswers.reduce(
        (sum, a) => sum + a.marksAwarded,
        0
      );

      // Step 3: Submit quiz result
      const payload = {
        user: userId,
        quiz: quizId,
        answers: evaluatedAnswers,
        score,
        totalQuestions,
        correctAnswers,
        timeSpent: 45,
        isCompleted: true,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        attemptNumber,
      };

      const res = await fetch("http://localhost:9705/userQuizResult/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📬 Response:", data);

      if (data.success) {
        // ✅ Step 4: Increment both quizScore and ecoPoints
        await fetch(`http://localhost:9705/user/increment-score/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score, correctAnswers }), // 👈 send both
        });

        // ✅ Step 5: Navigate to result page
        navigate(`/result/${data.resultId}`);
      } else {
        setIncompleteAlertMessage(
          "Failed to submit quiz. Reason: " + (data.error || data.message)
        );
        setShowIncompleteAlert(true);
      }
    } catch (error) {
      console.error("❌ Submission error:", error.message);
      setIncompleteAlertMessage("An error occurred during submission.");
      setShowIncompleteAlert(true);
    }
  };

  if (loading)
    return (
      <p className="text-center text-white text-lg mt-10">⏳ Loading quiz...</p>
    );
  if (!questions.length)
    return (
      <p className="text-center text-white text-lg mt-10">
        No questions found.
      </p>
    );

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        📝 Quiz Attempt
      </h1>
      {questions.map((q, index) => (
        <div
          key={q._id}
          className="relative mb-8 p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 shadow-xl transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-semibold flex-1">
              Q{index + 1}. {q.questionText}
            </h2>
            <div className="px-3 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full shadow-md whitespace-nowrap">
              {q.marks || 1} Mark{q.marks > 1 ? "s" : ""}
            </div>
          </div>
          <ul className="space-y-3">
            {q.options.map((opt, idx) => {
              const optLetter = String.fromCharCode(97 + idx);
              return (
                <li
                  key={idx}
                  onClick={() => handleAnswer(q._id, optLetter)}
                  className={`p-3 rounded-lg border border-white/10 font-medium cursor-pointer transition-all duration-200 ${getOptionClass(
                    q,
                    opt
                  )}`}
                >
                  <span className="mr-2 font-bold">
                    {optLetter.toUpperCase()}.
                  </span>{" "}
                  {opt}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="block mx-auto mt-8 px-6 py-3 rounded-lg bg-lime-500 hover:bg-lime-600 text-neutral-950 font-semibold shadow"
      >
        Submit Quiz
      </button>

      {/* Custom Incomplete Quiz Alert */}
      <AnimatePresence>
        {showIncompleteAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border border-white/10 rounded-xl p-8 max-w-sm w-full text-center shadow-lg space-y-6"
            >
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto" />
              <h3 className="text-2xl font-semibold text-white">
                Quiz Incomplete!
              </h3>
              <p className="text-gray-300">{incompleteAlertMessage}</p>
              <button
                onClick={() => setShowIncompleteAlert(false)}
                className="w-full px-6 py-3 bg-lime-500 hover:bg-lime-600 text-neutral-950 rounded-lg font-medium transition-colors"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizAttempt;
