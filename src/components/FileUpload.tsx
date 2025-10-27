import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  label?: string;
}

export default function FileUpload({ accept, multiple = false, onFilesSelected, label }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(multiple ? files : [files[0]]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? 'border-primary-500 bg-primary-500/10 scale-[1.02] shadow-xl shadow-primary-500/20'
          : 'border-primary-500/30 hover:border-primary-400/50 glass-card hover:border-primary-400/60'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
      <div className={`transition-all duration-300 ${isDragging ? 'scale-105' : ''}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-xl shadow-primary-400/40 glow-teal">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg font-bold text-white mb-2">
          {label || 'Drop your files here or click to browse'}
        </p>
        <p className="text-sm text-dark-400">
          {multiple ? 'You can select multiple files' : 'Select a file to continue'}
        </p>
      </div>
    </div>
  );
}
