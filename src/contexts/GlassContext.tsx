import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlassContextType {
  glassEnabled: boolean;
  toggleGlass: () => void;
  setGlassEnabled: (enabled: boolean) => void;
}

const GlassContext = createContext<GlassContextType | undefined>(undefined);

const GLASS_MODE_KEY = 'glass-mode-enabled';

export const GlassProvider = ({ children }: { children: ReactNode }) => {
  const [glassEnabled, setGlassEnabled] = useState(() => {
    const saved = localStorage.getItem(GLASS_MODE_KEY);
    return saved !== null ? saved === 'true' : true; // Default ON
  });

  useEffect(() => {
    localStorage.setItem(GLASS_MODE_KEY, String(glassEnabled));
    
    // Apply/remove glass class on document
    if (glassEnabled) {
      document.documentElement.classList.add('glass-mode');
    } else {
      document.documentElement.classList.remove('glass-mode');
    }
  }, [glassEnabled]);

  const toggleGlass = () => setGlassEnabled(prev => !prev);

  return (
    <GlassContext.Provider value={{ glassEnabled, toggleGlass, setGlassEnabled }}>
      {children}
    </GlassContext.Provider>
  );
};

export const useGlass = () => {
  const context = useContext(GlassContext);
  if (context === undefined) {
    throw new Error('useGlass must be used within a GlassProvider');
  }
  return context;
};
