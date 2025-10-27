import { useState } from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { tools, categories } from './types/tools';
import ImageConverter from './tools/ImageConverter';
import ImageCompressor from './tools/ImageCompressor';
import ImageMerger from './tools/ImageMerger';
import ImageEditor from './tools/ImageEditor';
import PDFConverter from './tools/PDFConverter';
import PDFMerger from './tools/PDFMerger';
import PDFSigner from './tools/PDFSigner';
import SamplePDFGenerator from './tools/SamplePDFGenerator';
import PlaceholderGenerator from './tools/PlaceholderGenerator';
import FaviconMaker from './tools/FaviconMaker';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = (toolId: string) => {
    switch (toolId) {
      case 'jpg-to-png':
        return <ImageConverter fromFormat="jpeg" toFormat="png" />;
      case 'png-to-jpg':
        return <ImageConverter fromFormat="png" toFormat="jpeg" />;
      case 'jpg-to-webp':
        return <ImageConverter fromFormat="jpeg" toFormat="webp" />;
      case 'png-to-webp':
        return <ImageConverter fromFormat="png" toFormat="webp" />;
      case 'webp-to-jpg':
        return <ImageConverter fromFormat="webp" toFormat="jpeg" />;
      case 'webp-to-png':
        return <ImageConverter fromFormat="webp" toFormat="png" />;
      case 'jpg-to-avif':
        return <ImageConverter fromFormat="jpeg" toFormat="avif" />;
      case 'png-to-avif':
        return <ImageConverter fromFormat="png" toFormat="avif" />;
      case 'jpg-to-bmp':
        return <ImageConverter fromFormat="jpeg" toFormat="bmp" />;
      case 'png-to-bmp':
        return <ImageConverter fromFormat="png" toFormat="bmp" />;
      case 'webp-to-bmp':
        return <ImageConverter fromFormat="webp" toFormat="bmp" />;

      case 'compress-jpg':
        return <ImageCompressor format="jpeg" />;
      case 'compress-png':
        return <ImageCompressor format="png" />;
      case 'compress-webp':
        return <ImageCompressor format="webp" />;

      case 'merge-jpg':
        return <ImageMerger format="jpeg" />;
      case 'merge-png':
        return <ImageMerger format="png" />;
      case 'merge-webp':
        return <ImageMerger format="webp" />;

      case 'jpg-to-pdf':
        return <PDFConverter fromFormat="jpg" />;
      case 'png-to-pdf':
        return <PDFConverter fromFormat="png" />;
      case 'webp-to-pdf':
        return <PDFConverter fromFormat="webp" />;
      case 'txt-to-pdf':
        return <PDFConverter fromFormat="txt" />;
      case 'merge-pdf':
        return <PDFMerger />;
      case 'sign-pdf':
        return <PDFSigner />;
      case 'sample-pdf':
        return <SamplePDFGenerator />;

      case 'resize':
        return <ImageEditor mode="resize" />;
      case 'rotate':
        return <ImageEditor mode="rotate" />;
      case 'flip':
        return <ImageEditor mode="flip" />;
      case 'grayscale':
        return <ImageEditor mode="grayscale" />;
      case 'saturation':
        return <ImageEditor mode="saturation" />;
      case 'hue':
        return <ImageEditor mode="hue" />;

      case 'placeholder':
        return <PlaceholderGenerator />;
      case 'favicon':
        return <FaviconMaker />;

      default:
        return <div>Tool not found</div>;
    }
  };

  const selectedToolData = tools.find(t => t.id === selectedTool);

  return (
    <div className="min-h-screen">
      <Navbar onSelectTool={setSelectedTool} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-600/10 rounded-full blur-2xl pulse-glow"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border-primary-400/30 mb-10 fade-in-up hover-glow">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
            <span className="text-sm font-semibold text-primary-300">Trusted by Professionals</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight fade-in-up">
            Convert, Edit & Process
            <span className="block text-gradient text-glow mt-3">Images & PDFs Instantly</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-dark-200 mb-14 max-w-3xl mx-auto leading-relaxed fade-in-up">
            All-in-one file toolkit with 30+ tools for image conversion, PDF editing, compression, and more.
            <br />
            <span className="font-semibold text-white">100% browser-based</span> — no uploads, no servers, complete privacy.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-14 fade-in-up">
            <div className="glass-card px-5 py-3 rounded-xl hover:border-primary-400/50 transition-all group">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="text-sm font-medium text-dark-200 group-hover:text-white transition-colors">100% Private</span>
              </div>
            </div>
            <div className="glass-card px-5 py-3 rounded-xl hover:border-accent-400/50 transition-all group">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-400 group-hover:text-accent-300 transition-colors" />
                <span className="text-sm font-medium text-dark-200 group-hover:text-white transition-colors">30+ Tools</span>
              </div>
            </div>
            <div className="glass-card px-5 py-3 rounded-xl hover:border-primary-400/50 transition-all group">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="text-sm font-medium text-dark-200 group-hover:text-white transition-colors">No Sign-Up</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#tools"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold fade-in-up"
          >
            <span>Browse Tools</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="relative py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => {
            const categoryTools = tools.filter(t => t.category === category.id);
            if (categoryTools.length === 0) return null;

            const CategoryIcon = category.icon;
            const isEven = categoryIndex % 2 === 0;

            return (
              <div key={category.id} className="mb-20">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 border border-primary-400/30">
                    <CategoryIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-2"></div>
                  </div>
                </div>
                
                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {categoryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        className="glass-card glass-card-hover rounded-xl p-6 text-left group"
                      >
                        {/* Icon Container */}
                        <div className="mb-4 inline-flex p-3 rounded-xl bg-primary-500/10 border border-primary-400/20 group-hover:border-primary-400/40 transition-all">
                          <ToolIcon className="w-6 h-6 text-primary-400 group-hover:text-primary-300 transition-colors" />
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">{tool.name}</h3>
                        <p className="text-sm text-dark-400 leading-relaxed group-hover:text-dark-300 transition-colors">{tool.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      <Modal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        title={selectedToolData?.name || ''}
      >
        {selectedTool && renderTool(selectedTool)}
      </Modal>
    </div>
  );
}

export default App;
