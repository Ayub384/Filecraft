import { Shield, Zap, Lock, Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6 group">
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-400 via-accent-400 to-primary-600 glow-teal group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white sparkle" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-50"></div>
                </div>
                <span className="text-2xl font-bold text-gradient">FileCraft</span>
              </div>
              <p className="text-dark-300 leading-relaxed mb-6">
                Professional file processing tools that work entirely in your browser. Crafted for privacy, speed, and reliability.
              </p>
              <div className="flex gap-4">
                <button className="p-2.5 rounded-lg glass-card hover:border-primary-400/50 hover-glow transition-all group">
                  <Github className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                </button>
                <button className="p-2.5 rounded-lg glass-card hover:border-accent-400/50 transition-all group">
                  <Twitter className="w-5 h-5 text-dark-400 group-hover:text-accent-400 transition-colors" />
                </button>
                <button className="p-2.5 rounded-lg glass-card hover:border-primary-400/50 transition-all group">
                  <Linkedin className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                </button>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card rounded-xl p-6 hover:border-primary-400/40 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-xl bg-primary-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Secure & Private</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  All processing happens locally. Your files never leave your device.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 hover:border-accent-400/40 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-xl bg-accent-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Lightning Fast</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  Instant results with optimized processing. No uploads, no delays.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 hover:border-primary-400/40 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-xl bg-primary-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Zero Tracking</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  No analytics, no data collection. Complete privacy guaranteed.
                </p>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <div id="about" className="glass-card rounded-2xl p-8 mb-12 hover:border-primary-400/30 transition-all duration-500">
            <h3 className="text-xl font-bold text-white mb-3">About FileCraft</h3>
            <p className="text-dark-300 leading-relaxed max-w-4xl">
              FileCraft is a professional file processing platform designed for users who value privacy and efficiency. 
              Built with modern web technologies, all operations run directly in your browser, ensuring complete privacy and security. 
              No servers, no uploads, just pure craftsmanship.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-primary-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-dark-500 text-sm">© 2025 FileCraft. All rights reserved.</p>
              <div className="flex gap-8 text-sm">
                <button className="text-dark-400 hover:text-primary-400 transition-colors font-medium">Privacy Policy</button>
                <button className="text-dark-400 hover:text-primary-400 transition-colors font-medium">Terms of Service</button>
                <button className="text-dark-400 hover:text-primary-400 transition-colors font-medium">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
