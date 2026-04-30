'use client';

import { motion } from 'framer-motion';
import { Trophy, ScrollText, Flame, GraduationCap, User, MoreHorizontal } from 'lucide-react';

// 5 primary tabs — most-used features always accessible on mobile.
// Remaining tabs (Guides, Competitive, Comparar, Dev) live in the sidebar drawer via "Más".
const PRIMARY_BOTTOM_TABS = [
  { id: 'tierlist', label: 'Tier List', icon: Trophy },
  { id: 'patches', label: 'Meta', icon: ScrollText },
  { id: 'combos', label: 'Combos', icon: Flame },
  { id: 'coaching', label: 'Coaching', icon: GraduationCap },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function BottomNav({ activeTab, onTabChange, onOpenSidebar }: { activeTab: string; onTabChange: (tab: string) => void; onOpenSidebar?: () => void }) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-lol-gold-dark/20 safe-bottom"
      style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)', backdropFilter: 'blur(20px) saturate(1.2)' }}
    >
      <div className="flex items-center justify-around px-1 py-1">
        {PRIMARY_BOTTOM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative flex flex-col items-center justify-center gap-0.5
                px-2 py-2 rounded-xl transition-all duration-200
                min-w-[52px] min-h-[44px]
                ${isActive
                  ? 'text-lol-gold bg-lol-gold/10'
                  : 'text-lol-dim active:text-lol-muted active:bg-lol-card/40'
                }
              `}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-[18px] h-[18px] transition-colors duration-200 ${isActive ? 'text-lol-gold' : 'text-lol-dim'}`} />
                {isActive && (
                  <motion.div
                    layoutId="bottom-active-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-lol-gold"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${isActive ? 'text-lol-gold' : 'text-lol-dim'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
        {/* Más button — opens sidebar drawer with Guides, Competitive, Comparar, Dev, etc. */}
        <button
          onClick={onOpenSidebar}
          className="
            flex flex-col items-center justify-center gap-0.5
            px-2 py-2 rounded-xl transition-all duration-200
            min-w-[52px] min-h-[44px]
            text-lol-dim active:text-lol-muted active:bg-lol-card/40
          "
          aria-label="Abrir menú lateral"
        >
          <MoreHorizontal className="w-[18px] h-[18px]" />
          <span className="text-[10px] font-medium leading-tight">Más</span>
        </button>
      </div>
    </nav>
  );
}
