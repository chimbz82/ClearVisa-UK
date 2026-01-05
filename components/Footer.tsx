
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-20 pb-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold flex items-center gap-2 mb-6">
              <span className="w-8 h-8 bg-white text-navy rounded flex items-center justify-center font-serif">C</span>
              <span>ClearVisa UK</span>
            </a>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Helping applicants understand where they stand before they apply. Get clarity, reduce risk, and save money.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#who-its-for" className="hover:text-white transition-colors">Who it's for</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="mailto:support@clearvisa.co.uk" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs">
            © 2024 ClearVisa UK. All rights reserved.
          </p>
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            Not affiliated with the UK government or Home Office.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
