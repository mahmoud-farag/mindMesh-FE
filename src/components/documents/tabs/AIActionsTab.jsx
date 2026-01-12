import React, { useState } from 'react';
import { Sparkles, BookOpen, LightbulbIcon } from 'lucide-react';
import toastService from '../../../utils/toasterUtils';
import { aiService } from '../../../services';
import { useParams } from 'react-router-dom';
import { BaseModal, MarkdownRenderer } from '../../common';

export default function AIActionsTab() {
  //* States
  const [concept, setConcept] = useState('');
  const [conceptAnswer, setConceptAnswer] = useState('');
  const [summary, setSummary] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'summary' | 'explanation' | null
  const [isLoading, setIsLoading] = useState(false);
  const { id: documentId } = useParams();

  //* Handlers
  async function handleGenerateSummary() {
    try {
      if (!documentId) {
        toastService.warning('Document id is missing');
        return;
      }

      setIsLoading(true);
      const response = await aiService.generateSummary({ documentId });

      if (response?.success && response?.data?.summary) {
        setSummary(response.data.summary);
        setActiveModal('summary');
      } else {
        toastService.error('Empty response');
      }
    } catch (error) {
      toastService.error(error?.message ?? 'Error while generating summary');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExplainConcept(e) {
    e.preventDefault();
    try {
      if (!documentId) {
        toastService.warning('Document id is missing');
        return;
      }

      setIsLoading(true);
      const response = await aiService.explainConcept({ concept, documentId });

      if (response?.success && response?.data?.answer) {
        setConceptAnswer(response.data.answer);
        setActiveModal('explanation');
      } else {
        toastService.error('Empty response');
      }
    } catch (error) {
      toastService.error(
        error?.message ?? 'Error while explaining your concept'
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleCloseModal() {
    setActiveModal(null);
    setConceptAnswer('');
    setSummary('');
    setConcept('');
  }

  //* JSX
  return (
    <div className="bg-white flex flex-col h-[62vh] pb-5 rounded-2xl">
      {/* header */}
      <div className="min-h-15 border-b border-slate-200 p-4 flex gap-3">
        <div className="bg-violet-500 size-8 sm:size-10 text-white flex rounded-xl shadow-xl items-center justify-center shrink-0">
          <Sparkles className="size-4 sm:size-5" strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold tracking-tight text-xl">AI Assistant</p>
          <span className="tracking-wide text-slate-400">
            Powered By Gemini AI
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 gap-6 flex flex-col px-6 mt-4 overflow-x-hidden">
        {/* AI summary section */}
        <section className="flex-1 flex flex-col gap-5 justify-center border border-slate-200 shadow-md rounded-2xl p-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="size-11 sm:size-15 bg-violet-300 inline-flex justify-center items-center rounded-xl text-violet-600">
                <BookOpen className="size-5 sm:size-9" strokeWidth={2} />
              </div>
              <span className="flex items-center text-lg sm:text-2xl font-semibold tracking-tight">
                Generate Summary
              </span>
            </div>

            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="min-[800px]:px-7 bg-linear-to-br py-1 from-violet-400 to-violet-700 rounded-2xl shadow-md text-white cursor-pointer hover:shadow-xl active:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && activeModal === null ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
          <p className="text-base text-slate-400">
            Get a concise summary of the entire document
          </p>
        </section>

        {/* AI Explain section */}
        <section className="flex-1 flex justify-center flex-col border border-slate-200 shadow-md rounded-2xl p-3">
          <div>
            <div>
              <div className="flex gap-4 mb-5">
                <div className="bg-amber-200 rounded-xl shadow-md size-12 inline-flex justify-center items-center">
                  <LightbulbIcon className="size-7 text-amber-700" />
                </div>
                <span className="inline-flex justify-center items-center text-xl font-semibold tracking-wide">
                  Explain a Concept
                </span>
              </div>
              <span className="text-slate-600">
                Enter a topic or concept from the document to get a detailed
                explanation
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-5">
            <input
              className="border border-slate-300 shadow-md flex-1 rounded-xl px-4 focus:outline-violet-400 text-md md:text-xl py-3"
              placeholder="e.g anything related to the document"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              disabled={isLoading}
            />
            <button
              onClick={handleExplainConcept}
              disabled={!concept?.trim() || isLoading}
              className="disabled:cursor-not-allowed disabled:opacity-50 bg-linear-to-br from-violet-400 to-violet-700 px-6 py-2 text-white bg-violet-600 rounded-2xl shadow-md hover:shadow-xl cursor-pointer active:scale-105 transition-all duration-200 min-w-[100px]"
            >
              {isLoading && activeModal === null && concept ? 'Explain...' : 'Explain'}
            </button>
          </div>
        </section>
      </div>

      {/* Modal for AI Actions */}
      <BaseModal
        isOpen={!!activeModal}
        onClose={handleCloseModal}
        title={
          activeModal === 'summary'
            ? 'Document Summary'
            : `Explanation: ${concept}`
        }
        icon={
          activeModal === 'summary' ? (
            <BookOpen className="size-12 text-violet-600" />
          ) : (
            <LightbulbIcon className="size-12 text-amber-600" />
          )
        }
        showFooter={false}
        size="2xl"
      >
        <div className="prose prose-slate max-w-none">
          <MarkdownRenderer
            content={activeModal === 'summary' ? summary : conceptAnswer}
          />
        </div>
      </BaseModal>
    </div>
  );
}

//  <div className="space-y-6">
//    {/* AI Assistant Header */}
//    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
//      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 inline-flex items-center justify-center shadow-lg shadow-violet-500/25">
//        <Sparkles className="w-6 h-6 text-white" />
//      </div>
//      <div>
//        <h3 className="text-lg font-semibold text-slate-900">AI Assistant</h3>
//        <p className="text-sm text-slate-500">Powered by advanced AI</p>
//      </div>
//    </div>

//    {/* Generate Summary Card */}
//    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6">
//      <div className="flex items-start justify-between gap-4">
//        <div className="flex items-start gap-3">
//          <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center shrink-0">
//            <FileText className="w-5 h-5 text-violet-600" />
//          </div>
//          <div>
//            <h4 className="font-semibold text-slate-900">Generate Summary</h4>
//            <p className="text-sm text-slate-500 mt-1">
//              Get a concise summary of the entire document.
//            </p>
//          </div>
//        </div>
//        <button
//          onClick={handleGenerateSummary}
//          className="shrink-0 px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
//        >
//          Summarize
//        </button>
//      </div>

//      {/* TODO: Display generated summary here */}
//    </div>

//    {/* Explain a Concept Card */}
//    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6">
//      <div className="flex items-start gap-3 mb-4">
//        <div className="w-10 h-10 rounded-lg bg-amber-100 inline-flex items-center justify-center shrink-0">
//          <Lightbulb className="w-5 h-5 text-amber-600" />
//        </div>
//        <div>
//          <h4 className="font-semibold text-slate-900">Explain a Concept</h4>
//          <p className="text-sm text-slate-500 mt-1">
//            Enter a topic or concept from the document to get a detailed
//            explanation.
//          </p>
//        </div>
//      </div>

//      <div className="flex gap-3">
//        <input
//          type="text"
//          placeholder="e.g., 'React Hooks'"
//          className="flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-500/10"
//        />
//        <button
//          onClick={handleExplainConcept}
//          className="shrink-0 px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
//        >
//          Explain
//        </button>
//      </div>

//      {/* TODO: Display explanation here */}
//    </div>
//  </div>;
