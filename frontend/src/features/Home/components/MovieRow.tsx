import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef } from "react";

interface MovieRowProps {
  title: string;
}

export const MovieRow = ({ title }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-2 group/row">
      {/* Header: Title and Buttons are now always parallel */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground truncate mr-4">
          {title}
        </h2>
        
        <div className="flex gap-1.5 shrink-0">
          <button 
            onClick={() => scroll("left")} 
            className="p-1.5 rounded-full bg-accent/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-90"
            aria-label="Previous"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button 
            onClick={() => scroll("right")} 
            className="p-1.5 rounded-full bg-accent/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-90"
            aria-label="Next"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-4 px-1"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div 
            key={i} 
            className="group relative min-w-[140px] md:min-w-[240px] aspect-[2/3] bg-card border border-border rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:border-primary hover:scale-[1.04]"
          >
            <div className="w-full h-full bg-muted flex items-center justify-center">
               <span className="text-[10px] text-muted-foreground uppercase font-black opacity-20">RwandaFlix</span>
            </div>

            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full mb-2">
                <Play size={18} fill="currentColor" />
              </div>
              <h3 className="text-[10px] md:text-xs font-bold text-foreground text-center">Movie Name {i}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};