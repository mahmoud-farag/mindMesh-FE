import React from 'react';
import { Sparkles, FileText, Lightbulb, Loader2 } from 'lucide-react';

export default function AIActionsTab({ documentId, onActionComplete }) {
    // TODO: Add your state and handlers here
    // const [summaryLoading, setSummaryLoading] = useState(false);
    // const [conceptInput, setConceptInput] = useState('');

    function handleGenerateSummary() {
        // TODO: Implement generate summary logic
        console.log('Generate summary for document:', documentId);
    }

    function handleExplainConcept() {
        // TODO: Implement explain concept logic
        console.log('Explain concept for document:', documentId);
    }

    return (
        <div className="space-y-6">
            {/* AI Assistant Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 inline-flex items-center justify-center shadow-lg shadow-violet-500/25">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">AI Assistant</h3>
                    <p className="text-sm text-slate-500">Powered by advanced AI</p>
                </div>
            </div>

            {/* Generate Summary Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Generate Summary</h4>
                            <p className="text-sm text-slate-500 mt-1">
                                Get a concise summary of the entire document.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleGenerateSummary}
                        className="shrink-0 px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                        Summarize
                    </button>
                </div>

                {/* TODO: Display generated summary here */}
            </div>

            {/* Explain a Concept Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 inline-flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900">Explain a Concept</h4>
                        <p className="text-sm text-slate-500 mt-1">
                            Enter a topic or concept from the document to get a detailed explanation.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="e.g., 'React Hooks'"
                        className="flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-lg focus:shadow-violet-500/10"
                    />
                    <button
                        onClick={handleExplainConcept}
                        className="shrink-0 px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                        Explain
                    </button>
                </div>

                {/* TODO: Display explanation here */}
            </div>
        </div>
    );
}
