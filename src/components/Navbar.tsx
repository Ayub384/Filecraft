import { Sparkles, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { categories, tools } from '../types/tools';

interface NavbarProps {
  onSelectTool: (toolId: string) => void;
}

export default function Navbar({ onSelectTool }: NavbarProps) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    }

    if (isToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToolsOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-primary-500/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Left-aligned Brand */}
          <div className="flex items-center gap-3 group">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary-400 via-accent-400 to-primary-600 glow-teal">
              <Sparkles className="w-5 h-5 text-white sparkle" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-50"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-gradient">FileCraft</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 text-sm font-medium text-dark-200 hover:text-primary-400 transition-colors"
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isToolsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 glass-card rounded-xl z-50">
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {categories.map((category) => {
                      const categoryTools = tools.filter(t => t.category === category.id);
                      if (categoryTools.length === 0) return null;
                      
                      const CategoryIcon = category.icon;
                      
                      return (
                        <div key={category.id} className="mb-4 last:mb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <CategoryIcon className="w-4 h-4 text-primary-400" />
                            <h3 className="text-sm font-semibold text-white">{category.name}</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {categoryTools.map((tool) => {
                              const ToolIcon = tool.icon;
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => {
                                    setIsToolsOpen(false);
                                    onSelectTool(tool.id);
                                  }}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-primary-500/10 transition-all text-left group"
                                >
                                  <ToolIcon className="w-4 h-4 text-dark-400 group-hover:text-primary-400 transition-colors" />
                                  <div className="text-sm text-dark-200 group-hover:text-white transition-colors">{tool.name}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-medium text-dark-200 hover:text-primary-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => {
                document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-5 py-2.5 text-sm font-semibold rounded-lg"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
