import { X, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useModalAnimation } from '../../context/customHooks';

const UploadingDocumentModal = ({
  shouldOpenModal,
  handleUpload,
  uploadTitle,
  setUploadTitle,
  handleFileChange,
  uploadFile,
  uploading,
  uploadingProgress,
  onClose
}) => {

  const { isVisible, handleCloseModal, shouldRender } = useModalAnimation({ isOpen: shouldOpenModal, onClose },);

  if (!shouldRender) return null;


  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${isVisible ? 'bg-slate-900/50' : 'bg-transparent'
        }`}

      onClick={handleCloseModal}
    >
      <div
        className={`p-5 relative bg-white/95 w-full max-w-lg border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
          }`}

        onClick={(e)=> e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 w-8 h-8  inline-flex items-center justify-center rounded-lg bg-slate-200 hover:bg-slate-200 shadow-sm hover:shadow-md text-slate-400 hover:text-slate-600 cursor-pointer transition-all duration-300"
        >
          <X className="w-7 h-7" strokeWidth={2} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-slate-900 tracking-tight">
            Upload New Document
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Add a PDF document to your library
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload} className=" space-y-5">
          {/* Title Input */}
          <div className=" space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Document Title
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              required
              className="w-full border-3 h-12 px-4 border-slate-200 rounded-2xl bg-slate-200/15 placeholder-slate-400 text-sm font-medium translation-all duration-200 focus:outline-none focus:border-violet-500 focus:shadow-lg focus:bg-white focus:shadow-violet-500/20"
              placeholder="e.g., React Interview Prep"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              PDF File
            </label>
            <div className="group relative border-3 border-dashed border-slate-300 p-2 rounded-2xl bg-slate-50/50 hover:border-violet-400/30 hover:bg-violet-100/10 transition-all duration-200">
              <input
                id="file-upload"
                type="file"
                className="absolute inset-0 size-full opacity-0 cursor-pointer "
                onChange={handleFileChange}
                accept=".pdf"
              />

              <div className="flex flex-col justify-center items-center p-4 ">
                <div className="inline-flex justify-center items-center rounded-xl size-13 bg-linear-to-r from-violet-200 to-purple-100 mb-2 shadow-md group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Upload
                    className="size-8 text-violet-600"
                    strokeWidth={2}
                  />
                </div>

                <p className="font-medium text-lg">
                  {uploadFile ? (
                    <span className="">{uploadFile.name}</span>
                  ) : (
                    <>
                      <span className="text-violet-500 font-semibold ">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </>
                  )}
                </p>

                <p className="text-slate-500 text-sm">PDF up to 7MB</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-around">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={uploading}
              className="cursor-pointer font-semibold bg-white border border-slate-300 rounded-lg py-2 px-4 w-full hover:bg-red-600 hover:text-white transition duration-300 active:scale-105"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="cursor-pointer font-semibold w-full border rounded-xl bg-linear-to-r from-violet-600 to-violet-300 border-slate-300 hover:from-violet-700 hover:to-violet-400 text-white shadow shadow-violet-100 active:scale-105 transition-transform duration-300 ease-in-out"
            >
              {uploading ? (
                <span className="">
                  <div className="" />
                  Uploading... ({uploadingProgress}%)
                </span>
              ) : (
                'Upload'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadingDocumentModal