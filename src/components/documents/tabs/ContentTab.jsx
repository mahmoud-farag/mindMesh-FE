import React from 'react';
import { FileText, Calendar, HardDrive, UserRoundCheck } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Loader } from '../../common';
import utils from '../../../utils/utils';
import moment from 'moment';

export default function ContentTab() {
  //* States
  const { document } = useOutletContext();

  //* Custom hooks

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX


  if (!document) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Document Info Card */}
      <div className=" backdrop-blur-xl border bg-white/80 border-slate-200/60 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-violet-500" />
          Document Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* File Size */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                File Size
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {utils.formateFileSize(document.fileSize) ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Upload Date */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center">
              <Calendar className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Uploading Date
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {moment(document.createdAt).fromNow() ?? 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center">
              <UserRoundCheck className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Uploaded By
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {document?.user?.username ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-violet-100 inline-flex items-center justify-center">
              <FileText className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Status
              </p>
              <p
                className={`text-sm font-semibold ${
                  document?.status === 'ready'
                    ? 'text-emerald-400'
                    : document?.status === 'processing'
                    ? 'text-amber-500'
                    : 'text-red-700-900'
                } capitalize`}
              >
                {document?.status === 'processing'
                  ? 'Still under processing'
                  : document?.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 shadow-lg">
        {/* PDF Viewer */}
        {document?.S3FileUrl && (
          <div className="bg-white/80 border border-slate-200/60 rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-4">Document Preview</h3>
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                document.S3FileUrl
              )}&embedded=true`}
              className="w-full h-[700px] rounded-xl border border-slate-200"
              title={document.title}
            />
          </div>
        )}
      </div>
    </div>
  );
}
