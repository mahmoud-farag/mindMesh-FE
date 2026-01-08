import React from 'react';
import { BookOpen, Plus, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlashcardsTab({ documentId, onActionComplete }) {
    //* States

    //* Custom hooks

    //* Refs

    //* Helper functions

    // Sample flashcard for UI preview
    const sampleCard = {
        question: 'What is React?',
        answer: 'A JavaScript library for building user interfaces.',
    };

    //* Life cycle hooks

    //* Handlers
    function handleGenerateFlashcards() {
    }

    function handlePrevious() {
    }

    function handleNext() {
    }

    function handleFlip() {
    }

    //* JSX

    return (
        <div className="space-y-6">
            {/* Header with Generate Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 inline-flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Flashcards</h3>
                        <p className="text-sm text-slate-500">0 cards available</p>
                    </div>
                </div>

                <button
                    onClick={handleGenerateFlashcards}
                    className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Generate Flashcards
                </button>
            </div>

            {/* Flashcard Display */}
            <div className="space-y-4">
                {/* Flashcard */}
                <div
                    className="relative min-h-[300px] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl"
                    onClick={handleFlip}
                >
                    <div className="absolute top-4 right-4 text-sm text-slate-400">
                        1 / 1
                    </div>

                    <div className="flex items-center justify-center h-full min-h-[200px]">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-wide text-violet-500 mb-2">
                                Question
                            </p>
                            <p className="text-xl text-slate-900 font-medium">
                                {sampleCard.question}
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-400 mt-4">
                        Click to flip
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrevious}
                        className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 inline-flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>

                    <button
                        onClick={handleFlip}
                        className="px-4 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-600 font-medium inline-flex items-center gap-2 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Flip
                    </button>

                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 inline-flex items-center justify-center transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
