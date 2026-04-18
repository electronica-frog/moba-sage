'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function MinimapDecoration() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay for smooth appearance
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 pointer-events-none z-[1]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{ opacity: 0.12 }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Map base */}
        <rect x="2" y="2" width="96" height="96" rx="4" fill="#0d1f15" stroke="rgba(200,170,110,0.15)" strokeWidth="0.5" />

        {/* River diagonal */}
        <motion.line
          x1="0" y1="100" x2="100" y2="0"
          stroke="rgba(10,203,230,0.3)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Top lane */}
        <line x1="10" y1="10" x2="10" y2="42" stroke="rgba(200,170,110,0.3)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="42" x2="42" y2="42" stroke="rgba(200,170,110,0.3)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Mid lane */}
        <line x1="42" y1="42" x2="58" y2="58" stroke="rgba(200,170,110,0.35)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bot lane */}
        <line x1="58" y1="58" x2="90" y2="58" stroke="rgba(200,170,110,0.3)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="58" x2="90" y2="90" stroke="rgba(200,170,110,0.3)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Blue side nexus */}
        <circle cx="10" cy="10" r="5" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="2" fill="rgba(59,130,246,0.4)" />

        {/* Red side nexus */}
        <circle cx="90" cy="90" r="5" fill="rgba(232,64,87,0.2)" stroke="rgba(232,64,87,0.3)" strokeWidth="0.8" />
        <circle cx="90" cy="90" r="2" fill="rgba(232,64,87,0.4)" />

        {/* Blue side jungle camps */}
        <circle cx="20" cy="20" r="1.5" fill="rgba(59,130,246,0.5)" />
        <circle cx="30" cy="30" r="1.5" fill="rgba(59,130,246,0.5)" />
        <circle cx="16" cy="36" r="1.5" fill="rgba(59,130,246,0.5)" />
        <circle cx="34" cy="22" r="1.5" fill="rgba(59,130,246,0.5)" />
        <circle cx="24" cy="28" r="1.2" fill="rgba(59,130,246,0.4)" />

        {/* Red side jungle camps */}
        <circle cx="80" cy="80" r="1.5" fill="rgba(232,64,87,0.5)" />
        <circle cx="70" cy="70" r="1.5" fill="rgba(232,64,87,0.5)" />
        <circle cx="84" cy="64" r="1.5" fill="rgba(232,64,87,0.5)" />
        <circle cx="66" cy="78" r="1.5" fill="rgba(232,64,87,0.5)" />
        <circle cx="76" cy="72" r="1.2" fill="rgba(232,64,87,0.4)" />

        {/* Dragon pit with pulse */}
        <motion.ellipse
          cx="54" cy="64"
          rx="6" ry="4"
          fill="rgba(240,198,70,0.15)"
          stroke="rgba(240,198,70,0.4)"
          strokeWidth="0.8"
          animate={{
            strokeOpacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <text x="54" y="66" fontSize="3" fill="rgba(240,198,70,0.5)" fontFamily="sans-serif" textAnchor="middle">D</text>

        {/* Baron pit with pulse */}
        <motion.ellipse
          cx="46" cy="30"
          rx="6" ry="4"
          fill="rgba(168,85,247,0.15)"
          stroke="rgba(168,85,247,0.4)"
          strokeWidth="0.8"
          animate={{
            strokeOpacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
        <text x="46" y="32" fontSize="3" fill="rgba(168,85,247,0.5)" fontFamily="sans-serif" textAnchor="middle">B</text>

        {/* Bush indicators */}
        <circle cx="18" cy="22" r="3.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="82" cy="22" r="3.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="24" cy="36" r="2.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="76" cy="36" r="2.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="38" cy="38" r="2.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="62" cy="62" r="2.5" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="2" fill="rgba(15,186,129,0.06)" stroke="rgba(15,186,129,0.2)" strokeWidth="0.4" />

        {/* Tower markers */}
        {/* Top lane towers */}
        <rect x="8.5" y="17" width="3" height="3" rx="0.5" fill="rgba(200,170,110,0.25)" />
        <rect x="8.5" y="27" width="3" height="3" rx="0.5" fill="rgba(200,170,110,0.2)" />
        {/* Mid lane towers */}
        <rect x="44" y="44" width="3" height="3" rx="0.5" fill="rgba(200,170,110,0.25)" transform="rotate(45 45.5 45.5)" />
        {/* Bot lane towers */}
        <rect x="88.5" y="70" width="3" height="3" rx="0.5" fill="rgba(232,64,87,0.2)" />
        <rect x="88.5" y="80" width="3" height="3" rx="0.5" fill="rgba(232,64,87,0.25)" />

        {/* Inhibitors */}
        <rect x="17" y="39" width="4" height="4" rx="0.5" fill="none" stroke="rgba(200,170,110,0.2)" strokeWidth="0.5" />
        <rect x="79" y="57" width="4" height="4" rx="0.5" fill="none" stroke="rgba(232,64,87,0.2)" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}
