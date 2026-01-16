import React from 'react';
import { useGetData } from '../../context/customHooks';
import { flashCardsService } from '../../services';
import { Loader } from '../../components/common';
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function FlashCardListPage() {
  const navigate = useNavigate();

  const {
    data: flashcards,
    loading,
    error,
  } = useGetData({
    initialState: [],
    serviceFunc: flashCardsService.getAllFlashcardSets,
    selectedField: 'flashcards', // Assuming the list is in 'flashcards' field
    showSuccessToast: false,
  });


  if (loading) {
    return (
      <div className="h-screen flex-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex-center flex-col gap-4">
        <p className="text-red-500 font-medium text-lg">
          {error?.message || 'Failed to load flashcard sets.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 space-y-8 w-full max-w-[1920px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">All Flashcard Sets</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flashcards?.map((set) => {
          // Calculate progress
          const cards = set.flashcards || [];
          const totalCards = cards.length;
          const reviewedCount = cards.filter((card) => card.reviewCount > 0).length;
          const progress = totalCards > 0 ? Math.round((reviewedCount / totalCards) * 100) : 0;

          return (
            <div
              key={set._id}
              className="hover:bg-slate-50 hover:border-violet-300 hover:shadow-md hover:scale-105 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 sm:gap-6 group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="size-10 sm:size-12 rounded-xl bg-violet-50 flex-center text-violet-600 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="size-5 sm:size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-tight line-clamp-2">{set.document?.title || 'Untitled Document'}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">CREATED {moment(set.createdAt).fromNow(true)} AGO</p>
                </div>
              </div>

              {/* Stats Badges */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-xs sm:text-sm font-semibold">
                  {totalCards} Cards
                </div>
                <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-violet-200 bg-violet-50 text-violet-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <TrendingUp className="size-3.5 sm:size-4" />
                  {progress}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Progress</span>
                  <span>
                    {reviewedCount}/{totalCards} reviewed
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/documents/${set.document?._id}/flashcards/${set._id}`)}
                className="w-full py-2 sm:py-3 rounded-xl bg-violet-50 text-violet-600 text-sm sm:text-base font-bold hover:text-white  hover:bg-violet-500 transition-colors flex-center gap-2 mt-auto"
              >
                <Sparkles className="size-4 sm:size-5" />
                Study Now
              </button>
            </div>
          );
        })}

        {flashcards.length === 0 && (
          <div className="col-span-full py-20 flex-center flex-col text-slate-400 gap-4">
            <BookOpen className="size-16 opacity-20" />
            <p className="text-lg font-medium">No flashcard sets found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
