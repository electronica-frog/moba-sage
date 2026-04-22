'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_TAB_ITEMS, DEV_TAB_ITEMS, DEV_TAB_IDS } from './constants';
import { Trophy, ScrollText, AlertTriangle, Flame, Crown, User, Rocket, Lightbulb, Map, Wrench, ChevronDown, ChevronRight } from 'lucide-react';

const DEV_ICONS: Record<string, typeof Wrench> = {
  novedades: Rocket,
  ideas: Lightbulb,
  roadmap: Map,
  tasks: Wrench,
};

const GAME_ICONS: Record<string, typeof Trophy> = {
  tierlist: Trophy,
  patches: ScrollText,
  broken: AlertTriangle,
  combos: Flame,
  competitive: Crown,
  profile: User,
};

export function SidebarNav({ activeTab, onTabChange, gamePatch }: { activeTab: string; onTabChange: (tab: string) => void; gamePatch?: string }) {
  const [devExpanded, setDevExpanded] = useState(DEV_TAB_IDS.has(activeTab));

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-[57px] bottom-0 w-[220px] border-r border-[#785a28]/15 z-30"
      style={{ backgroundColor: 'rgba(10, 14, 26, 0.96)', backdropFilter: 'blur(20px)' }}>

      {/* Game Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-none">
        <p className="text-[9px] text-[#785a28] tracking-[0.25em] uppercase font-semibold px-3 mb-2">Análisis</p>
        <div className="space-y-0.5">
          {GAME_TAB_ITEMS.map((tab) => {
            const Icon = GAME_ICONS[tab.id] || Trophy;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-[#c8aa6e]/10 text-[#c8aa6e]'
                    : 'text-[#5b5a56] hover:text-[#a09b8c] hover:bg-[#1e2328]/40'
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: 'linear-gradient(180deg, #c8aa6e, #785a28)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c8aa6e]' : 'text-[#785a28] group-hover:text-[#a09b8c]'}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c8aa6e]"
                    layoutId="sidebar-dot"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="my-4 mx-3 flex items-center gap-2">
          <div className="flex-1 h-px bg-[#785a28]/15" />
        </div>

        {/* Dev Navigation (collapsible) */}
        <button
          onClick={() => setDevExpanded(!devExpanded)}
          className="w-full flex items-center gap-2 px-3 mb-2 text-[9px] text-[#5b5a56] tracking-[0.25em] uppercase font-semibold hover:text-[#785a28] transition-colors"
        >
          <Wrench className="w-3 h-3" />
          <span>Desarrollo</span>
          <motion.div animate={{ rotate: devExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-3 h-3 ml-auto" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {devExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-0.5">
                {DEV_TAB_ITEMS.map((tab) => {
                  const Icon = DEV_ICONS[tab.id] || Wrench;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative
                        ${isActive
                          ? 'bg-[#0acbe6]/10 text-[#0acbe6]'
                          : 'text-[#5b5a56] hover:text-[#a09b8c] hover:bg-[#1e2328]/40'
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                          style={{ background: 'linear-gradient(180deg, #0acbe6, #0a7a8f)' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0acbe6]' : 'text-[#785a28] group-hover:text-[#a09b8c]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar footer with patch badge */}
      <div className="px-4 py-3 border-t border-[#785a28]/10">
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-[#785a28]/60 tracking-wider">MOBA SAGE v2.0</p>
          {gamePatch && (
            <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(15,186,129,0.1)', border: '1px solid rgba(15,186,129,0.2)', color: '#0fba81' }}>
              <span className="w-1 h-1 rounded-full bg-[#0fba81] animate-pulse" />
              {gamePatch}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
