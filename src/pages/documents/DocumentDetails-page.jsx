import React, { useMemo } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import documentService from '../../services/document-service';
import { useGetData } from '../../context/customHooks';
import { Loader } from '../../components/common';
import {
  ArrowLeft,
  BookOpen,
  Brain,
  BrainCircuit,
  FileChartColumn,
  MessageCircleMore,
} from 'lucide-react';

const TABs = [
  { id: 'content', label: 'Content', icon: FileChartColumn },
  { id: 'ai-actions', label: 'AI-Actions', icon: Brain },
  { id: 'flashcard-study', label: 'Flashcard', icon: BrainCircuit },
  { id: 'quizzes-study', label: 'Quizzes', icon: BookOpen },
  { id: 'chat', label: 'Chat', icon: MessageCircleMore },
];

export default function DocumentDetailsPage() {
  const Navigate = useNavigate();
  const { id } = useParams();

  const payload = useMemo(() => ({ documentId: id }), [id]);

  const { data: document, loading } = useGetData({
    initialState: null,
    serviceFunc: documentService.getDocument,
    payload,
    showSuccessToast: false,
    selectedField: 'document',
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 p-3   border-slate-300 rounded-xl pb-5">
      {/* navigation back arrow */}
      <div className="flex gap-2 mt-3  text-slate-500 hover:text-slate-900 pb-1  border-slate-300 transition-colors duration-200">
        <ArrowLeft />{' '}
        <button type="button" className="cursor-pointer" onClick={() => Navigate('/documents')}>
          Back To Documents
        </button>
      </div>

      {/* Main Header */}
      <div className="text-xl sm:text-2xl tracking-tight font-semibold truncate ">
        <p>{document?.title ?? 'N/A'}</p>
      </div>

      {/* tabs headers */}
      <nav className="mt-10 flex gap-2 sm:gap-3 text-xs md:text-lg md:gap-5 lg:gap-10 overflow-x-auto border-b border-slate-300 pb-2">
        {TABs.map((tab) => {
          const isNotReadyYet = document?.status !== 'ready';
          const isRestricted = isNotReadyYet && ['ai-actions', 'flashcard-study', 'quizzes-study', 'chat'].includes(tab.id);

          return (
            <NavLink
              key={tab.id}
              to={`/documents/${id}/${tab.id}`}
              onClick={(e) => isRestricted && e.preventDefault()}
              className={({ isActive }) =>
                `p-2 rounded-lg inline-flex justify-center items-center gap-1 sm:gap-2 whitespace-nowrap transition-colors duration-200 ${isActive ? 'bg-white text-violet-500 shadow-sm border-b-4 border-violet-500' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                } ${isRestricted ? 'opacity-50 cursor-not-allowed pointer-events-none grayscale' : ''}`
              }
              title={isRestricted ? (document?.status === 'processing' ? 'Document is still processing...' : 'Document failed to process') : ''}
            >
              {<tab.icon className="size-4 md:size-6" />}
              {tab.label}
            </NavLink>
          );
        })}
      </nav>

      {/* outlet render */}

      <Outlet context={{ document }} />
    </div>
  );
}
