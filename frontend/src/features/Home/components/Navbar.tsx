import { useState } from "react";
import { Link } from 'react-router-dom'
import { Search, ChevronDown, User, Menu, X, ChevronRight } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background border-b border-border">
      {/* Top Row: Logo & Search */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center gap-3 md:gap-8">
        <h1 className="text-primary font-black text-2xl tracking-tighter shrink-0 cursor-pointer">
          <span className="md:hidden">R.</span>
          <span className="hidden md:inline">RWANDAFLIX</span>
        </h1>
        
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full h-10 bg-input border border-border rounded-full pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:block shrink-0">
           <div className="w-9 h-9 rounded-full bg-accent border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <User size={18} className="text-muted-foreground" />
           </div>
        </div>
      </div>

      {/* Bottom Row: Centered Links with Increased Spacing */}
      <div className="hidden md:block border-t border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-center relative">
          
          {/* Nav Links Container */}
          <div className="flex items-center gap-70 h-full">
            <button className="text-sm font-bold text-foreground border-b-2 border-primary h-14 px-2 hover:text-primary transition-colors">
              Home
            </button>

            {/* Watch Dropdown */}
            <div className="relative h-14 group/main">
              <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground group-hover/main:text-primary transition-colors h-full uppercase tracking-widest">
                Watch <ChevronDown size={14} className="group-hover/main:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Box with Pointer */}
              <div className="absolute top-[calc(100%+0px)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border rounded-xl py-3 opacity-0 invisible group-hover/main:opacity-100 group-hover/main:visible transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
                
                {/* The Pointer (Arrow) */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-t border-l border-border rotate-45" />

                <div className="relative group/sub">
                  <button className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
                    Movies <ChevronRight size={14} />
                  </button>
                  
                  {/* Level 2 Sub-menu */}
                  <div className="absolute top-0 left-[calc(100%+10px)] w-56 bg-card border border-border rounded-xl py-3 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-2xl">
                    <span className="block px-6 py-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Movie Genres</span>
                    {["Action", "Comedy", "Drama", "Documentary"].map(item => (
                      <a key={item} href="#" className="block px-6 py-2.5 text-sm hover:bg-accent hover:text-primary transition-colors">{item}</a>
                    ))}
                  </div>
                </div>

                <a href="#" className="block px-6 py-3 text-sm font-medium hover:bg-accent transition-colors text-foreground">TV Series</a>
              </div>
            </div>

            {/* Categories Dropdown */}
            <div className="relative h-14 group">
              <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors h-full uppercase tracking-widest">
                Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-[calc(100%+0px)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-t border-l border-border rotate-45" />
                <a href="#" className="block px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">All Categories</a>
                <div className="h-px bg-border my-1 mx-4" />
                <a href="#" className="block px-6 py-2.5 text-sm hover:bg-accent transition-colors">Latest Releases</a>
              </div>
            </div>
          </div>

          <Link
            to="/Auth/signin"
            className="absolute left-345 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:brightness-125 transition-all">
            <User size={16} /> Portal
          </Link>
        </div>
      </div>

      {/* Mobile Menu (unchanged for responsiveness) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-64px)] bg-background z-[100] p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4">
           {/* ... existing mobile links ... */}
        </div>
      )}
    </nav>
  );
};