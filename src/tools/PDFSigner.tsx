import ToolInterface from '../components/ToolInterface';
import { signPDF } from '../utils/pdfProcessing';

export default function PDFSigner() {
  const handleSign = async (files: File[], signatureText: string): Promise<Blob> => {
    return await signPDF(files[0], signatureText);
  };

  return (
    <ToolInterface
      accept="application/pdf"
      multiple={false}
      onProcess={handleSign}
      outputFileName="signed.pdf"
      additionalInputs={(params, setParams) => {
        const signature = params.signature || '';
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Signature Text
            </label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setParams({ ...params, signature: e.target.value })}
              placeholder="Enter your signature"
              className="w-full px-3 py-2 border border-primary-500/30 rounded-lg bg-dark-800/50 text-white"
            />
          </div>
        );
      }}
    >
      <p>Upload a PDF file and add a digital signature to it.</p>
    </ToolInterface>
  );
}
