import { Download } from 'lucide-react';
import { generateSamplePDF } from '../utils/pdfProcessing';

export default function SamplePDFGenerator() {
  const handleGenerate = async () => {
    const blob = await generateSamplePDF();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center space-y-6 py-12">
      <div className="text-gray-300">
        <p className="mb-4">Generate a sample PDF document to test the PDF toolkit capabilities.</p>
        <p className="text-sm">The PDF will include formatted text and demonstrate basic PDF features.</p>
      </div>
      <button
        onClick={handleGenerate}
        className="bg-red-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-red-700 transition-colors inline-flex items-center gap-2 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5"
      >
        <Download className="w-5 h-5" />
        Generate Sample PDF
      </button>
    </div>
  );
}
