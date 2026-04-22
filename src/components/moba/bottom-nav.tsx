'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertTriangle, Flame, ScrollText, Crown, MoreHorizontal, X, Rocket, Lightbulb, Map, Wrench, User } from 'lucide-react';

// The 5 most important tabs for bottom nav
const PRIMARY_BOTTOM_TABS = [
  { id: 'tierlist', label: 'Tier List', icon: Trophy },
  { id: 'broken', label: 'Rotas', icon: AlertTriangle },
  { id: 'combos', label: 'Combos', icon: Flame },
  { id: 'patches', label: 'Parches', icon: ScrollText },
  { id: 'competitive', label: 'Comp.', icon: Crown },
];

const SECONDARY_TABS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'novedades', label: 'Novedades', icon: Rocket },
  { id: 'ideas', label: 'Ideas', icon: Lightbulb },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'tasks', label: 'Tareas', icon: Wrench },
];

export function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#785a28]/20"
        style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)', backdropFilter: 'blur(20px) saturate(1.2)' }}>
        <div className="flex items-center justify-around px-2 py-1">
          {PRIMARY_BOTTOM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isMore = tab.id === 'more';
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all duration-200 min-w-[56px]
                  ${isActive
                    ? 'text-[#c8aa6e]'
                    : 'text-[#5b5a56] active:text-[#a09b8c]'
                  }
                `}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="bottom-active-dot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                      style={{ background: '#c8aa6e' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
          {/* More button */}
          <button
            onClick={() => setShowMore(true)}
            className={`
              flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all duration-200 min-w-[56px]
              ${showMore ? 'text-[#c8aa6e]' : 'text-[#5b5a56] active:text-[#a09b8c]'}
            `}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium">Mas</span>
          </button>
        </div>
      </nav>

      {/* More Sheet */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
            />
            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-[#785a28]/30 max-h-[60vh] overflow-y-auto"
              style={{ backgroundColor: 'rgba(14, 18, 30, 0.98)', backdropFilter: 'blur(20px)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-[#785a28]/30" />
              </div>

              {/* Close button */}
              <div className="px-4 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#a09b8c]">Mas secciones</h3>
                <button onClick={() => setShowMore(false)} className="text-[#5b5a56] hover:text-[#a09b8c] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab items */}
              <div className="px-4 pb-8 space-y-1">
                {SECONDARY_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        setShowMore(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive
                          ? 'bg-[#c8aa6e]/10 text-[#c8aa6e]'
                          : 'text-[#5b5a56] hover:text-[#a09b8c] hover:bg-[#1e2328]/40 active:bg-[#1e2328]/60'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
