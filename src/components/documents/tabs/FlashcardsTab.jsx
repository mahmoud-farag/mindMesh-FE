import React, { useMemo, useState } from 'react';
import {
  Brain,
  Plus,
  Trash2,
  Calendar,
  Loader2,
  BrainCircuit,
} from 'lucide-react';
import { useGetData } from '../../../context/customHooks';
import { flashCardsService, aiService } from '../../../services';
import { Loader, ConfirmationModal } from '../../common';
import toastService from '../../../utils/toasterUtils';
import { useParams } from 'react-router-dom';
import FlashCardsViewer from '../FlashCardsViewer';

export default function FlashcardsTab() {
  //* States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    setId: null,
  });
  const { id: documentId } = useParams();
  const [openFlashcardsViewer, setOpenFlashcardsViewer] = useState(false);
  const [selectedCardsSet, setSelectedCardsSet] = useState(null);

  //* Custom hooks
  const payload = useMemo(() => ({ documentId }), [documentId]);
  const {
    data: flashcardSets,
    loading,
    refetchData: refetchFlashcards,
  } = useGetData({
    initialState: [],
    serviceFunc: flashCardsService.getFlashcardForDocument,
    payload,
    showSuccessToast: false,
    selectedField: 'flashcards', // Assuming the API returns { success: true, data: { flashcards: [...] ...} }
  });

  //* Handlers
  async function handleGenerateFlashcards() {
    try {
      setIsGenerating(true);
      const response = await aiService.generateFlashCards({
        documentId,
        numberOfFlashcards: 10,
      });

      if (response?.success) {
        toastService.success('Flashcards generated successfully!');
        refetchFlashcards();
      }
    } catch (error) {
      toastService.error(error?.message ?? 'An error occurred while generating flashcards.');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDeleteSet(setId) {
    setDeleteModal({ isOpen: true, setId });
  }

  async function handleConfirmDelete() {
    if (!deleteModal.setId) return;

    try {
      setIsDeleting(true);
      await flashCardsService.deleteFlashCardSet({
        flashCardSetId: deleteModal.setId,
      });
      toastService.success('Flashcard set deleted successfully.');
      refetchFlashcards();
      setDeleteModal({ isOpen: false, setId: null });
    } catch (error) {
      toastService.error(error?.message ?? 'An error occurred while deleting the flashcard set.');
    } finally {
      setIsDeleting(false);
    }
  }

  //* JSX
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader />
        <p className="mt-4 text-slate-500">Loading flashcards...</p>
      </div>
    );
  }

  // Empty State
  if (!flashcardSets || flashcardSets.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
          <BrainCircuit className="w-8 h-8 text-violet-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No Flashcards Yet
        </h3>
        <p className="text-slate-500 max-w-md mb-8">
          Generate flashcards from your document to start learning and reinforce
          your knowledge.
        </p>
        <button
          onClick={handleGenerateFlashcards}
          disabled={isGenerating}
          className="hover:cursor-pointer active:scale-105 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-lg shadow-violet-200"
        >
          {isGenerating ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Brain className="size-5" />
          )}
          {isGenerating ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </div>
    );
  }

  // List State
  return !openFlashcardsViewer ? (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Your Flashcard Sets
          </h3>
          <p className="text-slate-500 mt-1">
            {flashcardSets.length} set{flashcardSets.length !== 1 ? 's' : ''}{' '}
            available
          </p>
        </div>
        <button
          onClick={handleGenerateFlashcards}
          disabled={isGenerating}
          className="hover:cursor-pointer active:scale-105 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          Generate New Set
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flashcardSets.map((set) => (
          <div
            key={set._id}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-violet-300 hover:shadow-md transition-all duration-200 flex flex-col gap-4 hover:scale-105 hover:bg-slate-100 "
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors">
                <Brain className="w-6 h-6 text-violet-600" />
              </div>
              <button
                onClick={() => handleDeleteSet(set._id)}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Set"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4
                className="font-semibold text-slate-900 text-lg line-clamp-1"
                title="Flashcard Set"
              >
                Flashcard Set
              </h4>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {new Date(set.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-3">
                <span
                  onClick={() => {
                    setOpenFlashcardsViewer(true);
                    setSelectedCardsSet(set);
                  }}
                  className="px-4 py-2 hover:bg-white hover:cursor-pointer hover:shadow-md inline-flex items-center  rounded-md text-sm font-medium bg-violet-50 text-violet-700 border border-violet-100"
                >
                  {set.flashcards?.length || 0} cards
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, setId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Flashcard Set"
        confirmText="Delete"
        variant="danger"
        isLoading={isDeleting}
      >
        <p className="text-slate-600 text-center">
          Are you sure you want to delete this flashcard set? This action cannot
          be undone.
        </p>
      </ConfirmationModal>
    </div>
  ) : (
    <FlashCardsViewer
      setOpenFlashcardsViewer={setOpenFlashcardsViewer}
      selectedCardsSet={selectedCardsSet}
      setSelectedCardsSet={setSelectedCardsSet}
    />
  );
}
