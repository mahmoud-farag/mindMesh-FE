import { Sparkles } from 'lucide-react';
import React from 'react';
import MarkdownRenderer from '../common/MarkdownRenderer';
import { useAuth } from '../../context/authContext';

const Message = ({ record }) => {
  const isUser = record?.message?.role === 'user';
  const { loggedUser } = useAuth();

  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 my-3 sm:my-4 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <div className="bg-violet-500 size-6 sm:size-10 text-white flex rounded-md sm:rounded-xl shadow-md items-center justify-center shrink-0">
          <Sparkles className="size-4 sm:size-5" strokeWidth={2} />
        </div>
      )}

      <div
        className={`max-w-[90%]  sm:max-w-md md:max-w-lg p-3 sm:p-4 rounded-2xl text-sm sm:text-base wrap-break-word overflow-hidden ${isUser
          ? 'bg-linear-to-br from-violet-500 to-violet-300 text-white rounded-br-md'
          : 'bg-slate-50 border border-slate-200/60 text-slate-800 rounded-bl-md'
          }`}
      >
        {isUser ? (
          <p>{record?.message?.question}</p>
        ) : (
          <div className="prose prose-sm sm:prose-base max-w-none ">
            <MarkdownRenderer content={record?.message?.answer} />
          </div>
        )}
      </div>

      {isUser && (
        <span className="bg-slate-300 text-slate-900 size-6 sm:size-10 rounded-md sm:rounded-xl inline-flex items-center justify-center text-sm sm:text-base shrink-0">
          {loggedUser.username[0].toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Message;