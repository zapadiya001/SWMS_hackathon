import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageTransition from "../components/PageTransition";
import { BookOpenCheck, Sparkles } from "lucide-react";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9705/quiz/quizzes")
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  const groupedQuizzes = quizzes.reduce((acc, quiz) => {
    const topic = quiz.title || "Untitled Quiz";
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(quiz);
    return acc;
  }, {});

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-16 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 text-transparent bg-clip-text">
            🌱 Eco Quiz Arena
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Challenge your knowledge & earn rewards. Each quiz sharpens your eco-intellect!
          </p>
        </motion.div>

        {/* Quiz Groups */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {Object.entries(groupedQuizzes).map(([topic, topicQuizzes]) => (
            <div
              key={topic}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-lg"
            >
              {/* Topic Title */}
              <div className="flex items-center gap-2 mb-6">
                <BookOpenCheck className="text-lime-400" />
                <h2 className="text-2xl font-bold text-lime-400">{topic}</h2>
              </div>

              {/* Quiz Cards (Full Width) */}
              <div className="flex flex-col gap-6">
                {topicQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full bg-neutral-800/80 hover:shadow-xl border border-white/10 hover:border-lime-500 rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                      <p className="text-sm text-gray-400">
                        {quiz.description?.substring(0, 100) || "No description provided."}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs px-3 py-1 rounded-full bg-lime-800/30 text-lime-300 font-medium">
                          {quiz.difficulty} | {quiz.category}
                        </span>
                        <button
                          onClick={() => navigate(`/quiz/${quiz._id}/attempt`)}
                          className="px-4 py-2 text-sm rounded-full bg-gradient-to-tr from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 transition-all duration-200 text-white font-semibold shadow-md"
                        >
                          <Sparkles size={16} className="inline-block mr-1" />
                          Take Quiz
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Quiz;
