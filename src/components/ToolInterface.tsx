import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import FileUpload from './FileUpload';

interface ToolInterfaceProps {
  accept: string;
  multiple?: boolean;
  onProcess: (files: File[], ...args: any[]) => Promise<Blob>;
  outputFileName: string;
  children?: React.ReactNode;
  additionalInputs?: React.ReactNode;
}

export default function ToolInterface({
  accept,
  multiple = false,
  onProcess,
  outputFileName,
  children,
  additionalInputs
}: ToolInterfaceProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [additionalParams, setAdditionalParams] = useState<any>({});

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    setError(null);

    try {
      const params = Object.values(additionalParams);
      const blob = await onProcess(files, ...params);
      setResult(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const url = URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setAdditionalParams({});
  };

  return (
    <div className="space-y-6">
      {children && <div className="text-gray-300 mb-4 leading-relaxed">{children}</div>}

      {files.length === 0 ? (
        <FileUpload
          accept={accept}
          multiple={multiple}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-5">
            <p className="font-bold text-white mb-3">Selected Files:</p>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-sm glass-card px-4 py-3 rounded-lg border-primary-500/20">
                  <span className="truncate text-white font-medium">{file.name}</span>
                  <span className="text-dark-400 ml-2 text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
                </li>
              ))}
            </ul>
          </div>

          {additionalInputs && (
            <div className="glass-card rounded-xl p-5">
              {typeof additionalInputs === 'function'
                ? additionalInputs(additionalParams, setAdditionalParams)
                : additionalInputs}
            </div>
          )}

          {error && (
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 text-primary-400 backdrop-blur-sm">
              {error}
            </div>
          )}

          {!result && (
            <div className="flex gap-3">
              <button
                onClick={handleProcess}
                disabled={processing}
                className="flex-1 btn-primary py-3.5 px-6 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Process File'
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3.5 glass-card rounded-xl font-bold hover:border-primary-400/50 transition-all text-white"
              >
                Reset
              </button>
            </div>
          )}

          {result && (
            <div className="glass-card border-primary-400/40 rounded-xl p-6 text-center space-y-4">
              <div className="text-primary-400 font-bold text-lg">✓ Processing complete!</div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 btn-primary py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Result
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3.5 glass-card rounded-xl font-bold hover:border-primary-400/50 transition-all text-white"
                >
                  Process Another
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
