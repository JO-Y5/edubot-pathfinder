
import { useState } from 'react';
import AssistantPanel from './AssistantPanel';

export default function AssistantLauncher(){
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setOpen(true)} className="fixed z-40 bottom-4 right-4 md:bottom-6 md:right-6 bg-black text-white rounded-full px-4 py-3 shadow-xl">🤖</button>
      {open && <AssistantPanel onClose={()=>setOpen(false)} />}
    </>
  );
}
