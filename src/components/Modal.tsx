import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-primary-400/30">
        <div className="flex items-center justify-between px-8 py-6 border-b border-primary-500/20 bg-darker/80">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-500/10 rounded-lg transition-all duration-300 group border border-transparent hover:border-primary-400/30"
          >
            <X className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-darker">
          {children}
        </div>
      </div>
    </div>
  );
}
