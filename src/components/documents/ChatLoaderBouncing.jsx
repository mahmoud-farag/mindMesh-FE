import { Sparkles, Ellipsis } from 'lucide-react';
import React from 'react';

const ChatLoaderBouncing = () => {
  return (
    <div className=" mt-4 inline-flex  justify-start gap-2 ">
      <div className="bg-violet-500 size-10 text-white flex rounded-xl shadow-md items-center justify-center">
        <Sparkles className="size-5" />
      </div>
      {/* <div className=" bg-slate-200/80 px-4 rounded-t-lg rounded-l-lg animate-bounce">
        <Ellipsis className="size-10 text-violet-500" />
      </div> */}
      <div className="flex items-center gap-1 bg-slate-100 px-4 rounded-2xl">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default ChatLoaderBouncing;
