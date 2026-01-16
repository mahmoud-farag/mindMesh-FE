import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizService } from '../../services';
import { useGetData } from '../../context/customHooks';
import { Loader, GoBackButton } from '../../components/common';
import toastService from '../../utils/toasterUtils';

export default function QuizTakePage() {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // [{ questionIndex: Number, selectedAnswer: String }]

  const [isSubmitting, setIsSubmitting] = useState(false);

  const payload = useMemo(() => ({ quizId }), [quizId]);
  const {
    data: quiz,
    loading,
    error,
  } = useGetData({
    initialState: null,
    serviceFunc: quizService.getQuizById,
    payload,
    selectedField: 'quiz',
    showSuccessToast: false,
  });

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const totalQuestions = quiz?.totalQuestions ?? 0;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  console.log('--currentQuestionIndex:', currentQuestionIndex);
  console.log('--:progress', progress);

  // Find answer for current question
  const currentAnswerObj = answers.find(
    (ans) => ans.questionIndex === currentQuestionIndex
  );

  let selectedAnswer = currentAnswerObj
    ? currentAnswerObj.selectedAnswer
    : null;

  const handleOptionSelect = (option) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (ans) => ans.questionIndex === currentQuestionIndex
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = {
          questionIndex: currentQuestionIndex,
          questionId: currentQuestion._id,
          selectedAnswer: option,
        };
        return newAnswers;
      } else {
        // Add new answer
        return [
          ...prev,
          {
            questionIndex: currentQuestionIndex,
            questionId: currentQuestion._id,
            selectedAnswer: option,
          },
        ];
      }
    });
  };

  const handleNext = async () => {
    console.log('--selectedAnswer:', selectedAnswer);
    console.log('--currentQuestionIndex:', currentQuestionIndex);
    if (currentQuestionIndex + 1 === totalQuestions) {
      if (isSubmitting) return;

      try {
        if (!answers || !answers?.length) {
          toastService.error('No answers to be submitted');
          return;
        }

        setIsSubmitting(true);
        const response = await quizService.submitQuiz({ quizId, answers });

        if (response?.success) {
          toastService.success(
            response?.message ?? 'Your answers submitted successfully'
          );
          navigate(`/quizzes/${quizId}/result`);
        } else {
          toastService.error('An Error happen while submitting the answers');
        }
      } catch (error) {
        toastService.error(
          error?.message ?? 'Error while submitting your answers'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    selectedAnswer = null;
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  //JSX
  if (loading) {
    return (
      <div className="h-screen flex-center flex-col">
        <Loader />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className=" h-screen flex-center flex-col">
        <p className="text-red-500 font-medium">
          {error?.message || 'Failed to load quiz.'}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white bg-violet-600 rounded-lg mt-4 hover:bg-violet-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (quiz?.isCompleted) {
    return (
      <div className="h-full flex-center">
        <p className="text-slate-500 font-semibold text-xl md:text-3xl">
          Quiz Already taken
        </p>
      </div>
    );
  }
  return (
    <div className="pb-10 w-full max-w-5xl mx-auto h-full flex flex-col overflow-hidden space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}

      <GoBackButton className="mt-3" />
      <div className="pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900">{quiz.title}</h1>
            <p className="text-slate-500 text-sm mt-1">Topic: {quiz.document?.title || 'General Knowledge'}</p>
          </div>
          <p className=" px-4 py-2 bg-violet-50 text-violet-700 rounded-lg font-semibold text-sm">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="border border-violet-200 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Main Question Body */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-slate-800 leading-tight">{currentQuestion.question}</h2>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            return (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`
                  group relative p-4 md:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 shadow-sm hover:scale-105 
                  ${isSelected ? 'border-violet-500 bg-violet-50/50 shadow-md shadow-violet-100' : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                     size-6 md:size-8  px-2 rounded-full text-sm font-bold border-2 transition-colors flex-center
                      ${isSelected
                        ? 'bg-violet-500 border-violet-500 text-white'
                        : 'bg-white border-slate-300 text-slate-500 group-hover:border-violet-400 group-hover:text-violet-500'
                      }
                    `}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`text-xs md:text-lg font-medium ${isSelected ? 'text-violet-900' : 'text-slate-700'}`}>{option}</span>
                  {isSelected && <CheckCircle2 className="w-6 h-6 text-violet-500 ml-auto" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`text-slate-600 font-medium  text-xs sm:text-lg cursor-pointer border border-slate-300 shadow-md hover:bg-slate-100 active:scale-95 py-2 px-3 sm:py-3 sm:px-8 rounded-xl iFlex-center transition-all duration-200 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={isSubmitting || !selectedAnswer}
          className={`disabled:opacity-50 disabled:cursor-not-allowed  text-xs sm:text-lg font-semibold py-2 px-3 sm:py-3 sm:px-8 bg-linear-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-xl shadow-lg shadow-violet-200 active:scale-95 cursor-pointer iFlex-center transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? 'Submitting...' : currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
          {!(isSubmitting || currentQuestionIndex === totalQuestions - 1) && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
