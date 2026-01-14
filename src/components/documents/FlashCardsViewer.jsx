import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Star,
} from 'lucide-react';
import { flashCardsService } from '../../services';
import toastService from '../../utils/toasterUtils';

const FlashCardsViewer = ({
  setOpenFlashcardsViewer,
  selectedCardsSet,
  setSelectedCardsSet,
}) => {
  // states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = selectedCardsSet?.flashcards || [];
  const currentCard = flashcards[currentIndex];

  // handlers
  function handleOnBack() {

    setOpenFlashcardsViewer(false);
    setSelectedCardsSet(null);
  }

  function handleNext() {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 150);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev - 1), 150);
    }
  }

  async function handleFlip() {
    const nextFlippedState = !isFlipped;
    setIsFlipped(nextFlippedState);

    if (nextFlippedState) {
      try {
        await flashCardsService.reviewFlashCard({ cardId: currentCard._id });
      } catch (error) {
        toastService.error(error?.message ?? 'Error reviewing flashcard');

      }
    }
  }

  async function handleOnStar(e) {
    e.stopPropagation();
    try {
      const response = await flashCardsService.toggleFlashCard({
        cardId: currentCard._id,
      });

      if (response?.success && response?.data?.flashcardSet) {
        const updatedSet = response.data.flashcardSet;

        if (updatedSet._id === selectedCardsSet._id) {
          setSelectedCardsSet((prev) => ({
            ...prev,
            flashcards: updatedSet.flashcards,
          }));
        }
      }
    } catch (error) {
      toastService.error(error?.message ?? 'Error happen while starring the card');
    }
  }

  if (!currentCard) return null;

  return (
    <div classname="space-y-4">
      <button
        onClick={handleOnBack}
        className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors font-medium group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back To Sets</span>
      </button>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Card Container */}
        <div
          className="perspective-1000 w-full h-[400px] cursor-pointer group"
          onClick={handleFlip}
        >
          <div
            className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''
              }`}
          >
            {/* Front Face */}
            <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden border border-slate-200">
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                  {currentCard.difficulty || 'Medium'}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <button
                  className="text-slate-300 hover:text-yellow-400 transition-colors"
                  onClick={handleOnStar}
                >
                  <Star className={`size-6 ${currentCard?.isStarred ? 'text-amber-400' : ''}`} />
                </button>
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center max-w-2xl leading-relaxed">
                {currentCard.question}
              </h3>

              <div className="absolute bottom-8 text-slate-400 text-sm font-medium flex items-center gap-2 animate-pulse">
                <RotateCw className="w-4 h-4" />
                Click to reveal answer
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-br from-violet-400 to-violet-600 rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 text-white">
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
                  Answer
                </span>
              </div>

              <p className="text-xl md:text-2xl font-medium text-center max-w-2xl leading-relaxed">
                {currentCard.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="size-6" />
          </button>

          <span className="text-slate-500 font-medium min-w-[60px] text-center">
            {currentIndex + 1} / {flashcards.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </div>
  );
};

export default FlashCardsViewer;