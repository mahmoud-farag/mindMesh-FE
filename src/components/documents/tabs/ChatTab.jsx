import React, { useEffect, useMemo, useRef } from 'react';
import { Send, MessageSquare, User, Bot, SendIcon, MessageSquareText } from 'lucide-react';
import { useAuth } from '../../../context/authContext';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGetData } from '../../../context/customHooks';
import { aiService } from '../../../services';
import { Loader } from '../../common';

export default function ChatTab() {

  //* States
  const { id } = useParams();



  //* Custom hooks
  const { loggedUser } = useAuth();
  const payload = useMemo(() => ({ documentId: id }), [id]);
  const { data: historyState, loading } = useGetData({
    initialState: [],
    serviceFunc: aiService.getChatHistory,
    payload,
    showSuccessToast: false,
  });



  //* Refs
  const lastMessageRef = useRef(null);




  //* Helper functions
  function scrollDown() {
    lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  //* Life cycle hooks
  useEffect(() => {
    scrollDown();
  }, [historyState]);



  //* Handlers
  function handleSubmit(e) {
    e.preventDefault();
    try {
    } catch (error) { }
  }




  //* JSX
  if (loading) {
    return (
      <div className=" flex justify-center items-center flex-col ">
        <div className=" size-15 rounded-2xl bg-violet-300 inline-flex justify-center items-center text-violet-700 mt-10">
          <MessageSquareText className="size-7" />
        </div>
        <Loader />
        <p className="text-center mb-5 tracking-wide text-violet-600">
          Loading Chat History...
        </p>
      </div>
    );
  }

  return (
    <div className="h-150 flex flex-col ">
      {/* header */}
      <div className="h-20  p-3">
        <p className="text-xl tracking-tight ">
          You can chat with AI about your document contents
        </p>
      </div>

      {/* body */}
      <div className="bg-white rounded-2xl flex-1 p-3 mb-4 shadow-md">
        {historyState?.histories?.length > 0 ? (
          <div className="border w-full h-full">data exist</div>
        ) : (
          <div className="gap-2  w-full h-full flex items-center-safe justify-center flex-col ">
            <div className="size-14 bg-violet-300 rounded-xl inline-flex justify-center items-center">
              {' '}
              <MessageSquareText className="size-7 text-violet-600" />
            </div>

            <div className=" text-center">
              <p className="font-semibold">Start A conversation</p>
              <p className="tracking-wide text-slate-400">
                Ask me anything about the document
              </p>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="h-15 p-3 ">
        <form onSubmit={handleSubmit} className="flex gap-2 ">
          <input
            type="text"
            className=" bg-white  text-slate-500 shadow-md focus:shadow-lg focus:shadow-violet-200 placeholder:text-slate-400 px-4 rounded-xl focus:outline-none focus:border-violet-300 flex-1 focus:text-base focus:tracking-tight   "
            placeholder="Ask any question related to the document"
          />
          <button className="cursor-pointer inline-flex justify-center items-center rounded-xl bg-violet-500 size-10 ">
            <SendIcon className="size-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
