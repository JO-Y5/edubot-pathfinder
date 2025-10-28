
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AssistantPanel({onClose}:{onClose:()=>void}){
  const { t } = useTranslation();
  const [tab, setTab] = useState<'chat'|'voice'>('chat');
  const [log, setLog] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function send(){
    const v = inputRef.current?.value?.trim();
    if(!v) return;
    setLog(prev=>[...prev, `🧑 ${v}`, `🤖 (demo) ${v}`]);
    if (inputRef.current) inputRef.current.value = '';
  }

  const canVoice = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;
  const recRef = useRef<any>(null);
  useEffect(()=>{
    if (canVoice && !recRef.current){
      // @ts-ignore
      const R = new webkitSpeechRecognition();
      const rtl = document.documentElement.getAttribute('dir') === 'rtl';
      R.lang = rtl ? 'ar-EG' : 'en-US';
      R.continuous = false; R.interimResults = false;
      R.onresult = (e:any)=>{
        const text = Array.from(e.results).map((r:any)=>r[0].transcript).join(' ');
        setLog(prev=>[...prev, `🎙️ ${text}`, `🤖 (demo) ${text}`]);
      };
      recRef.current = R;
    }
  }, [canVoice]);

  function startVoice(){ if(recRef.current) recRef.current.start(); }

  return (
    <div className="fixed z-50 bottom-20 right-4 md:right-6 w-[min(92vw,420px)] bg-white border rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex gap-2">
          <button onClick={()=>setTab('chat')} className={`px-3 py-1 rounded ${tab==='chat'?'bg-black text-white':''}`}>{t('chat') ?? 'Chat'}</button>
          <button onClick={()=>setTab('voice')} className={`px-3 py-1 rounded ${tab==='voice'?'bg-black text-white':''}`}>{t('voice') ?? 'Voice'}</button>
        </div>
        <button onClick={onClose} className="text-sm">{t('close') ?? 'Close'}</button>
      </div>

      {tab==='chat' && (
        <div className="p-4">
          <div className="h-64 overflow-auto border rounded-lg p-2 text-sm space-y-1 bg-neutral-50">
            {log.map((l,i)=>(<div key={i}>{l}</div>))}
          </div>
          <div className="mt-2 flex gap-2">
            <input ref={inputRef} className="flex-1 border rounded-lg px-3 py-2" placeholder={t('type_message') ?? 'Type your message...'} />
            <button onClick={send} className="px-4 py-2 rounded-lg bg-black text-white">→</button>
          </div>
        </div>
      )}

      {tab==='voice' && (
        <div className="p-4">
          <div className="h-64 overflow-auto border rounded-lg p-2 text-sm space-y-1 bg-neutral-50">
            {log.map((l,i)=>(<div key={i}>{l}</div>))}
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={startVoice} className="px-4 py-2 rounded-lg bg-black text-white">🎙️ {t('speak_to_assistant') ?? 'Speak to the assistant'}</button>
          </div>
          {!('webkitSpeechRecognition' in window) && (
            <p className="text-xs opacity-70 mt-2">Web Speech API not supported on this browser.</p>
          )}
        </div>
      )}
    </div>
  );
}
