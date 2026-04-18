'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMobaTheme, type MobaTheme } from './theme-provider';

const THEME_COLORS: Record<MobaTheme, string> = {
  'blue-essence': '#c89b3c',
  'red-essence': '#c83232',
  'prestige': '#f0e6d2',
};

const THEME_LABELS: Record<MobaTheme, string> = {
  'blue-essence': 'Esencia Azul',
  'red-essence': 'Esencia Roja',
  'prestige': 'Prestigio',
};

export function ThemeToggle() {
  const { theme, cycleTheme, themeLabel } = useMobaTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const color = THEME_COLORS[theme];

  return (
    <div className="relative">
      <motion.button
        onClick={cycleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0 0 16px ${color}25`,
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Cambiar tema: ${themeLabel}`}
      >
        <Palette className="w-4 h-4" style={{ color }} />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap pointer-events-none z-50"
            style={{
              background: 'rgba(30,35,40,0.95)',
              border: `1px solid ${color}40`,
              color,
              backdropFilter: 'blur(8px)',
            }}
          >
            {THEME_LABELS[theme]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
