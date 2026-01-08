import React from 'react';
import { BrainCircuit, Plus, Clock, Play } from 'lucide-react';

export default function QuizzesTab({ documentId, onActionComplete }) {
    // TODO: Add your state and handlers here
    // const [quizzes, setQuizzes] = useState([]);

    function handleGenerateQuiz() {
        // TODO: Implement generate quiz logic
        console.log('Generate quiz for document:', documentId);
    }

    function handleStartQuiz(quizId) {
        // TODO: Implement start quiz navigation
        console.log('Start quiz:', quizId);
    }

    // Sample quiz for UI preview
    const sampleQuizzes = [
        { _id: '1', title: 'React Basics Quiz', questionCount: 10, createdAt: new Date() }
    ];

    return (
        <div className="space-y-6">
            {/* Header with Generate Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 inline-flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Quizzes</h3>
                        <p className="text-sm text-slate-500">1 quiz available</p>
                    </div>
                </div>

                <button
                    onClick={handleGenerateQuiz}
                    className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Generate Quiz
                </button>
            </div>

            {/* Quiz List */}
            <div className="space-y-4">
                {sampleQuizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 hover:shadow-lg transition-all duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1">
                                    {quiz.title}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="inline-flex items-center gap-1">
                                        <BrainCircuit className="w-4 h-4" />
                                        {quiz.questionCount} questions
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        Just now
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleStartQuiz(quiz._id)}
                                className="px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium rounded-xl transition-colors inline-flex items-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Start
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
