import { Link } from 'react-router';
import { mutedText } from '../styles/common';

function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-24 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
          
          <div className="flex gap-6">
            <Link to="/login" className="text-slate-600 hover:text-blue-500 transition-colors">Login</Link>
            <Link to="/register" className="text-slate-600 hover:text-blue-500 transition-colors">Register</Link>
          </div>
        </div>
        <p className={mutedText}>© 2024 BlogApp. All rights reserved. Made with pastel colors.</p>
      </div>
    </footer>
  );
}

export default Footer;

