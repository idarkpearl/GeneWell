
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogoIcon } from './Icons';

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState({ name: "English", code: "EN" });

    const languages = [
        { name: "English", code: "EN" },
        { name: "Español", code: "ES" },
        { name: "Français", code: "FR" },
        { name: "Deutsch", code: "DE" },
        { name: "中文 (简体)", code: "ZH" },
        { name: "日本語", code: "JA" },
        { name: "हिन्दी", code: "HI" },
        { name: "Português", code: "PT" },
        { name: "Русский", code: "RU" },
        { name: "తెలుగు", code: "TE" },
        { name: "தமிழ்", code: "TA" },
        { name: "বাংলা", code: "BN" },
    ];

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m0 10v2M5 21v-2m4 2v-2M3 10h18M5 10a2 2 0 11-4 0 2 2 0 014 0zM19 10a2 2 0 11-4 0 2 2 0 014 0zM5 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{selectedLang.code}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20">
                    {languages.map((lang) => (
                        <a key={lang.code} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); setSelectedLang(lang); setIsOpen(false); }}>
                            {lang.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header: React.FC = () => {
  const navLinkClasses = "text-gray-600 hover:text-blue-600 transition-colors";
  const activeNavLinkClasses = "text-blue-600 font-semibold";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <LogoIcon className="h-10 w-10" />
          <span className="text-xl font-bold text-gray-800">GeneWell</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? `${activeNavLinkClasses}` : `${navLinkClasses}`}>Home</NavLink>
          <NavLink to="/genetic-counseling" className={({ isActive }) => isActive ? `${activeNavLinkClasses}` : `${navLinkClasses}`}>Genetic Counseling</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${activeNavLinkClasses}` : `${navLinkClasses}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${activeNavLinkClasses}` : `${navLinkClasses}`}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/login" className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
