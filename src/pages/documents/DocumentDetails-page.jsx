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

  const { data, loading } = useGetData({
    initialState: null,
    serviceFunc: documentService.getDocument,
    payload,
    showSuccessToast: false,
  });

 
  const document = data?.document;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 p-3  shadow-md border-slate-300 rounded-xl pb-5">
      {/* navigation back arrow */}
      <div className="flex gap-2 mt-3  text-slate-500 hover:text-slate-900 pb-1  border-slate-300 transition-colors duration-200">
        <ArrowLeft />{' '}
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => Navigate('/documents')}
        >
          Back To Documents
        </button>
      </div>

      {/* Main Header */}
      <div className="text-2xl tracking-tight font-semibold ">
        <p>{data?.document?.title ?? 'N/A'}</p>
      </div>

      {/* tabs headers */}
      <nav className="mt-10  flex gap-3 text-sm md:text-md md:gap-5 lg:gap-10 overflow-x-auto border-b border-slate-300 pb-2 ">
        {TABs.map((tab) => (
          <NavLink
            key={tab.id}
            to={`/documents/${id}/${tab.id}`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white border-b-3 p-2 rounded-lg text-warp inline-flex justify-center items-center gap-2 text-violet-500 border-violet-500 whitespace-nowrap transition-all duration-200'
                : 'text-warp inline-flex justify-center items-center gap-2 whitespace-nowrap'
            }
          >
            {<tab.icon className="size-4 md:size-6 " />}
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* outlet render */}

      <Outlet context={{ document }} />
    </div>
  );
}
