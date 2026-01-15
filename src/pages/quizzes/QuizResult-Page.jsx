import React, { useMemo } from 'react';
import { quizService } from '../../services';
import { useGetData } from '../../context/customHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { GoBackButton, Loader } from '../../components/common';
import {
  CircleCheck,
  CirclePile,
  CircleX,
  ReceiptText,
  ScanSearch,
  Trophy,
} from 'lucide-react';

export default function QuizResultPage() {
  //* states
  const { id: quizId } = useParams();
  const navigate = useNavigate();

  const payload = useMemo(() => ({ quizId }), [quizId]);

  //* custom hooks
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

  //* helper functions
  let answerMap;

  function getAnswerDetails(questionId) {
    if (!answerMap) {
      answerMap = quiz?.userAnswers.reduce((acc, userAnswer) => {
        acc[userAnswer.questionId] = userAnswer;
        return acc;
      }, {});
    }

    const object = {};

    const userAnswer = answerMap?.[questionId];

    object.isCorrect = userAnswer?.isCorrect ?? false;
    object.selectedAnswer = userAnswer?.selectedAnswer ?? '';

    return object;
  }

  //* JSX
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-medium">
          {error?.message || 'Failed to load quiz.'}
        </p>
        <button
          onClick={() => navigate('documents')}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Go Back To Documents Page
        </button>
      </div>
    );
  }

  //* drived states
  const score = quiz?.score ?? 0;
  const totalQuestions = quiz?.totalQuestions ?? 0;
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const wrongAnswers = totalQuestions - score;

  return (
    <div className="py-7 space-y-6 mx-auto w-full max-w-4xl">
      <p className="font-semibold text-xl sm:text-2xl tracking-wide text-slate-700">
        {quiz?.title} Results
      </p>

      {/* scoring area */}
      <div className="gap-5 bg-white flex flex-col py-9 border border-slate-300 shadow-md rounded-2xl items-center">
        <div className="  flex flex-col items-center gap-4">
          <div className="size-10 md:size-14 inline-flex justify-center items-center rounded-xl bg-emerald-200">
            <Trophy className="size-7 md:size-10 text-emerald-700" />
          </div>
          <p className="text-xl md:text-2xl text-slate-600">
            YOUR SCORE: <span className="text-red-500 ">{percentage}%</span>
          </p>
        </div>

        <div className=" flex gap-5 justify-center ">
          <div className="border px-5 py-2 iFlex-center text-slate-600 font-semibold rounded-xl border-slate-300 bg-slate-50 shadow-sm">
            <CirclePile className="" />
            <span className="pt-2">{totalQuestions} Total</span>
          </div>
          <div className="border px-5 py-2 iFlex-center rounded-xl border-emerald-300 bg-emerald-100 text-emerald-700 shadow-sm font-semibold">
            <CircleCheck />
            <span className="pt-1">{score} Correct</span>
          </div>
          <div className="border px-5 py-2 iFlex-center rounded-xl border-red-300 bg-red-100 text-red-500 shadow-sm font-semibold">
            <CircleX />
            <span className="pt-1 ">{wrongAnswers} Wrong</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-slate-600">
        <ReceiptText className=" size-8" />
        <p className="  text-2xl font-semibold"> More Details</p>
      </div>
      {/* answers results */}
      {(quiz?.questions || []).map((record, index) => {
        const { isCorrect, selectedAnswer } = getAnswerDetails(record._id);

        return (
          <div
            key={record._id || index}
            className="bg-white p-4 rounded-xl shadow-md space-y-6"
          >
            <div className="flex gap-2">
              <div className="flex-1 ">
                <p className="bg-slate-200 inline p-2 rounded-xl font-semibold text-slate-700">
                  Question {index + 1}
                </p>
                <p className="mt-4 text-xl font-semibold tracking-tight">
                  {record?.question ?? 'N/A'}
                </p>
              </div>
              {/*  */}
              {isCorrect ? (
                <div className="">
                  <div className="bg-emerald-100 size-10 rounded-lg iFlex-center shadow-md border-3 border-emerald-200">
                    <CircleCheck className="size-7 text-emerald-600" />
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="bg-red-100 size-10 rounded-lg iFlex-center shadow-md border-3 border-red-200">
                    <CircleX className="size-7 text-red-600" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {(record?.options ?? []).map((option) => {
                const isOptionCorrect = record?.correctAnswer === option;
                const isOptionSelected = selectedAnswer === option;

                return (
                  <div
                    key={option}
                    className={`border min-h-14 py-2 flex items-center justify-between px-3 border-slate-300 rounded-xl shadow-md ${
                      isOptionCorrect
                        ? 'bg-emerald-100 border-emerald-300'
                        : isOptionSelected && !isCorrect
                        ? 'bg-red-100 border-red-300'
                        : 'bg-slate-50'
                    } `}
                  >
                    <p className="tracking-wide text-slate-700 font-medium">
                      {option}
                    </p>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      {isOptionSelected && !isCorrect && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 border border-red-200 text-red-600 text-sm font-semibold">
                          <CircleX className="size-4" />
                          <span>Your Answer</span>
                        </div>
                      )}

                      {isOptionCorrect && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-600 text-sm font-semibold">
                          <CircleCheck className="size-4" />
                          <span>Correct</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shadow-md border p-4 flex gap-3 bg-slate-100 border-slate-300 rounded-xl ">
              <div className=" iFlex-center">
                <p className="">
                  <ScanSearch className="size-10" />
                </p>
              </div>
              <div className="">
                <p className="font-semibold text-lg md:text-xl text-slate-700">
                  Explanation:
                </p>
                <p className="text-slate-600">{record?.explanation ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        );
      })}

      <GoBackButton
        onClick={() => navigate(`/documents/${quiz.document}/quizzes-study`)}
        label="Go Back to the document?"
      />
    </div>
  );
}
