import { Sparkles } from 'lucide-react';
import React from 'react'
import MarkdownRenderer from '../common/MarkdownRenderer';
import { useAuth } from '../../context/authContext';

const Message = ({ record }) => {
  const isUser = record?.message?.role === 'user';
  const { loggedUser } = useAuth();

  return (
    <div
      className={` flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <div className="bg-violet-500 size-10 text-white flex rounded-xl shadow-md items-center justify-center">
          <Sparkles className="" strokeWidth={2} />
        </div>
      )}

      <div
        className={`max-w-lg p-4 rounded-2xl shadow-md ${
          isUser
            ? 'bg-linear-to-br from-violet-500 to-violet-300 text-white rounded-br-md'
            : 'bg-white border border-slate-200/60 text-slate-800 rounded-bl-md'
        }`}
      >
        {isUser ? (
          <p className="">{record?.message?.question}</p>
        ) : (
          <div className="">
            <MarkdownRenderer content={record?.message?.answer} />
          </div>
        )}
      </div>

      {isUser && <span className='bg-slate-300 text-slate-900 size-10 rounded-xl inline-flex items-center justify-center '>{loggedUser.username[0].toUpperCase()}</span>}
    </div>
  );
};

export default Message