import { useState } from 'react';
import { Download } from 'lucide-react';
import { generatePlaceholder } from '../utils/imageProcessing';

export default function PlaceholderGenerator() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [text, setText] = useState('Placeholder');
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#333333');
  const [preview, setPreview] = useState<string | null>(null);

  const handleGenerate = async () => {
    const blob = await generatePlaceholder(width, height, text, bgColor, textColor);
    const url = URL.createObjectURL(blob);
    setPreview(url);
  };

  const handleDownload = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = `placeholder-${width}x${height}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full px-3 py-2 border border-red-500/30 rounded-lg bg-black/80 text-white"
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-red-500/30 rounded-lg bg-black/80 text-white"
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-red-500/30 rounded-lg bg-black/80 text-white"
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 px-1 py-1 border border-red-500/30 rounded-lg bg-black/80"
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 px-1 py-1 border border-red-500/30 rounded-lg bg-black/80"
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5"
      >
        Generate Placeholder
      </button>

      {preview && (
        <div className="space-y-4">
          <div className="border border-red-500/30 rounded-xl p-4 bg-black/80" style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
            <img src={preview} alt="Generated placeholder" className="max-w-full mx-auto" />
          </div>
          <button
            onClick={handleDownload}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download Placeholder
          </button>
        </div>
      )}
    </div>
  );
}
