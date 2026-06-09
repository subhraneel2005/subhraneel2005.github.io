import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Resume() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-neutral-800">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <a
          href="/Subhraneel_Goswami_SDE.pdf"
          download
          className="flex items-center gap-2 text-sm font-bold bg-white text-black px-4 py-2 rounded-xl hover:bg-neutral-200 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
      <div className="flex-1 min-h-0">
        <iframe
          src="/Subhraneel_Goswami_SDE.pdf"
          className="w-full h-full border-0"
          title="Resume PDF"
        />
      </div>
    </div>
  );
}
