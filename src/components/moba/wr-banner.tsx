'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Smartphone } from 'lucide-react';

export function WildRiftHeader({ version }: { version?: string }) {
  return (
    <motion.div
      className="mb-4 rounded-xl p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(10,203,230,0.08), rgba(10,203,230,0.02))',
        border: '1px solid rgba(10,203,230,0.2)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(10,203,230,0.2), rgba(10,203,230,0.05))', border: '1px solid rgba(10,203,230,0.3)' }}>
          <Smartphone className="w-5 h-5 text-lol-success" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-lol-success">WILD RIFT — Patch {version || '6.4'}</h3>
          <p className="text-[10px] text-lol-dim">Mobile Analytics — Campeones S/A/B tier con builds y análisis</p>
        </div>
        <Badge variant="outline" className="text-[10px] border-lol-success/30 text-lol-success">WR</Badge>
      </div>
    </motion.div>
  );
}
