import { FileText } from 'lucide-react';
import React from 'react';

const NoDocuments = () => {
  //* States

  //* Custom hooks

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX
  return (
    <div className="min-h-[400px]  flex flex-col gap-3 justify-center items-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-200 inline-flex items-center justify-center">
        <FileText className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl text-slate-900 font-semibold tracking-tight">
        No Documents Yet
      </h3>

      <p className="text-md text-slate-500">
        Get started by uploading your first PDF document to begin your learning.
      </p>
    </div>
  );
}

export default NoDocuments