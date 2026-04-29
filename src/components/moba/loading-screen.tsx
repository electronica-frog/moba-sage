'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Sword, Database, Shield, Swords, Target, TrendingUp,
  Zap, Globe, Trophy, Flame, Sparkles, ChevronRight
} from 'lucide-react';

/* ================================================================
   MOBA SAGE — Loading Screen v6.0
   - ~12s timeline, sources animate slowly and readable
   - "Entrar" button appears AFTER all sources finish (~12s)
   - No auto-dismiss — user controls when to enter
   - Self-contained, only fetches /api/version
   - z-index 210
   ================================================================ */

interface VersionInfo {
  lol: string;
  wr: string;
  gamePatch: string;
  metaLastUpdated: string;
  fetchedAt: string;
  ddragonStatus: string;
}

interface SourceDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  doneLabel: string;
  records: string;
  appearAt: number; // ms
  doneAt: number;   // ms
}

export interface LoadingScreenProps {
  onSkip?: () => void;
}

export function LoadingScreen({ onSkip }: LoadingScreenProps) {
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [mountedAt] = useState(() => Date.now());
  const [allDone, setAllDone] = useState(false);

  // Detect when all sources are done
  useEffect(() => {
    const iv = setInterval(() => {
      const ms = Date.now() - mountedAt;
      // All sources done at ~12s (last source doneAt: 12000)
      if (ms >= 12500) {
        setAllDone(true);
      }
    }, 200);
    return () => clearInterval(iv);
  }, [mountedAt]);

  // Fetch version for display
  useEffect(() => {
    fetch('/api/version')
      .then(r => r.json())
      .then(d => setVersion(d))
      .catch(() => {});
  }, []);

  // Timer
  useEffect(() => {
    const iv = setInterval(() => {
      setElapsed(Math.floor((Date.now() - mountedAt) / 100) / 10);
    }, 100);
    return () => clearInterval(iv);
  }, [mountedAt]);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Buenos dias';
    if (h >= 12 && h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const formatDate = (iso: string) => {
    if (!iso) return '...';
    const d = new Date(iso);
    const m = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatTime = (iso: string) => {
    if (!iso) return '...';
    return new Date(iso).toLocaleTimeString('es-AR', { timeZone: 'America/Buenos_Aires', hour: '2-digit', minute: '2-digit' });
  };

  // 7 data sources — spread across 12 seconds for readability
  const sources: SourceDef[] = [
    { id: 'ddragon',   name: 'Data Dragon (Riot Games)',    icon: <Shield className="w-3.5 h-3.5" />,     color: '#c8aa6e', doneLabel: version ? `v${version.lol} (CDN Live)` : 'v16.9.1', records: 'Live',     appearAt: 800,   doneAt: 2800 },
    { id: 'champions', name: 'Base de Campeones',            icon: <Swords className="w-3.5 h-3.5" />,    color: '#0acbe6', doneLabel: '167 campeones cargados',                         records: '167',     appearAt: 2000,  doneAt: 4500 },
    { id: 'tierlist',  name: 'Tier List & Meta Data',         icon: <TrendingUp className="w-3.5 h-3.5" />, color: '#0fba81', doneLabel: '42 insights generados',                           records: '42',      appearAt: 3200,  doneAt: 6000 },
    { id: 'probuilds', name: 'Pro Builds & Tournament Picks', icon: <Trophy className="w-3.5 h-3.5" />,    color: '#f0c646', doneLabel: '58 picks profesionales',                            records: '58',      appearAt: 4500,  doneAt: 7500 },
    { id: 'insights',  name: 'Insights de IA',               icon: <Sparkles className="w-3.5 h-3.5" />,  color: '#a78bfa', doneLabel: 'Modelo IA preparado',                               records: 'IA',      appearAt: 5500,  doneAt: 8500 },
    { id: 'combos',    name: 'Combos Rotos',                icon: <Flame className="w-3.5 h-3.5" />,     color: '#e84057', doneLabel: '23 combos identificados',                          records: '23',      appearAt: 6500,  doneAt: 10000 },
    { id: 'patches',   name: 'Patch Notes & Cambios',         icon: <Zap className="w-3.5 h-3.5" />,       color: '#785a28', doneLabel: '4 parches analizados',                             records: '4',       appearAt: 7800,  doneAt: 12000 },
  ];

  const ms = Date.now() - mountedAt;
  const doneCount = sources.filter(s => ms >= s.doneAt).length;
  const progressPct = Math.min(100, Math.round((ms / 12000) * 100));

  // Steps — spread across 12s
  const steps = [
    { label: 'Inicializando conexion',            done: ms > 2000 },
    { label: 'Consultando Data Dragon',           done: ms > 2800 },
    { label: 'Cargando base de campeones',        done: ms > 4500 },
    { label: 'Descargando tier list y meta',      done: ms > 6000 },
    { label: 'Procesando datos profesionales',      done: ms > 7500 },
    { label: 'Generando insights de IA',           done: ms > 8500 },
    { label: 'Analizando combos rotos',            done: ms > 10000 },
    { label: 'Preparando interfaz',               done: ms > 12000 },
  ];
  const activeStepIdx = steps.findIndex(s => !s.done);

  return (
    <motion.div
      className="fixed inset-0 z-[210] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ backgroundColor: '#060a12' }}
    >
      {/* BG layers */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(200,170,110,0.07) 0%, transparent 55%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 15% 85%, rgba(10,203,230,0.04) 0%, transparent 35%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 75%, rgba(15,186,129,0.03) 0%, transparent 35%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(30deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%), linear-gradient(150deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%)',
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 40px 70px',
      }} />

      <div className="relative z-10 w-full max-w-[420px] px-5 flex flex-col items-center">

        {/* Logo */}
        <motion.div className="relative mb-5" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <motion.div className="absolute -inset-5" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
            <div className="w-full h-full rounded-full" style={{ border: '1px dashed rgba(200,170,110,0.12)' }} />
          </motion.div>
          <motion.div className="absolute -inset-3 rounded-full" animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, rgba(200,170,110,0.18) 0%, transparent 70%)' }} />
          <motion.div
            className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(145deg, rgba(200,170,110,0.14), rgba(200,170,110,0.04))', border: '1.5px solid rgba(200,170,110,0.22)', boxShadow: '0 0 50px rgba(200,170,110,0.08)' }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sword className="w-8 h-8" style={{ color: '#c8aa6e' }} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-[28px] sm:text-[32px] font-black tracking-[0.22em] mb-0.5"
          style={{ color: '#c8aa6e', fontFamily: 'var(--font-cinzel), serif', textShadow: '0 0 30px rgba(200,170,110,0.35)' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
          MOBA SAGE
        </motion.h1>

        <motion.p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#5b5a56' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          {getGreeting()}, invocador
        </motion.p>

        {/* CARGANDO DATOS */}
        <motion.div className="mb-5 flex items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-3.5 h-3.5 rounded-full"
            style={{ border: '2.5px solid rgba(200,170,110,0.2)', borderTopColor: '#c8aa6e' }} />
          <span className="text-[12px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#c8aa6e' }}>
            Cargando datos
          </span>
          <motion.span style={{ color: '#785a28' }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ...
          </motion.span>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="w-full h-[3px] rounded-full overflow-hidden mb-5" style={{ background: 'rgba(200,170,110,0.06)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.3 }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #785a28, #c8aa6e, #0acbe6)' }}
            animate={{ width: `${Math.max(progressPct, 2)}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
        </motion.div>

        {/* Patch info card */}
        <motion.div className="w-full rounded-xl p-3.5 mb-3"
          style={{ background: 'linear-gradient(135deg, rgba(30,35,40,0.65), rgba(18,22,30,0.85))', border: '1px solid rgba(200,170,110,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" style={{ color: '#785a28' }} />
              <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#785a28' }}>Versiones del juego</span>
            </div>
            <span className="text-[9px] font-mono" style={{ color: '#5b5a56' }}>{elapsed.toFixed(1)}s</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>League of Legends</p>
              <p className="text-base font-bold font-mono" style={{ color: '#f0e6d2' }}>{version ? version.lol : '...'}</p>
            </div>
            <div className="w-px h-7 shrink-0" style={{ background: 'rgba(200,170,110,0.08)' }} />
            <div className="flex-1 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>Wild Rift</p>
              <p className="text-base font-bold font-mono" style={{ color: '#f0e6d2' }}>{version ? version.wr : '...'}</p>
            </div>
            <div className="w-px h-7 shrink-0" style={{ background: 'rgba(200,170,110,0.08)' }} />
            <div className="flex-1 rounded-lg px-2.5 py-1.5 flex flex-col items-center justify-center" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>CDN</p>
              <div className="flex items-center gap-1">
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full" style={{ background: version?.ddragonStatus === 'live' ? '#0fba81' : '#f0c646' }} />
                <span className="text-[10px] font-bold font-mono" style={{ color: version?.ddragonStatus === 'live' ? '#0fba81' : '#f0c646' }}>
                  {version?.ddragonStatus === 'live' ? 'LIVE' : '...'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid rgba(200,170,110,0.06)' }}>
            <span className="text-[8px]" style={{ color: '#5b5a56' }}>
              Meta actualizado: <span style={{ color: '#785a28' }}>{version?.metaLastUpdated ? formatDate(version.metaLastUpdated) : '...'}</span>
            </span>
            <span className="text-[8px]" style={{ color: '#5b5a56' }}>
              Datos obtenidos: <span style={{ color: '#785a28' }}>{version?.fetchedAt ? formatTime(version.fetchedAt) : '...'}</span>
            </span>
          </div>
        </motion.div>

        {/* Data Sources card */}
        <motion.div className="w-full rounded-xl p-3.5 mb-3"
          style={{ background: 'linear-gradient(135deg, rgba(30,35,40,0.65), rgba(18,22,30,0.85))', border: '1px solid rgba(10,203,230,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.4 }}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Database className="w-3 h-3" style={{ color: '#0acbe6' }} />
              <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#0acbe6' }}>Fuentes de datos</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-mono" style={{ color: '#5b5a56' }}>{doneCount}/{sources.length}</span>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: doneCount === sources.length ? '#0fba81' : '#f0c646' }} />
            </div>
          </div>
          <div className="space-y-1">
            {sources.map((source) => {
              const visible = ms >= source.appearAt;
              const done = ms >= source.doneAt;
              const loading = visible && !done;
              return (
                <motion.div key={source.id} className="flex items-center justify-between rounded-lg px-2.5 py-[7px]"
                  style={{ background: loading ? 'rgba(200,170,110,0.04)' : done ? `${source.color}06` : 'rgba(10,14,26,0.35)' }}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: visible ? 1 : 0, x: 0 }}
                  transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="relative shrink-0">
                      {loading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-3 h-3 rounded-sm" style={{ border: '1.5px solid rgba(200,170,110,0.2)', borderTopColor: source.color }} />
                      ) : done ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: `${source.color}22` }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: source.color }} />
                        </motion.div>
                      ) : (
                        <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(91,90,86,0.15)' }} />
                      )}
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: !visible ? '#3d3c38' : loading ? '#a09b8c' : '#a09b8c' }}>
                      {source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {done && (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${source.color}10`, color: source.color }}>
                        {source.records}
                      </span>
                    )}
                    <span className="text-[9px] font-mono max-w-[130px] truncate text-right" style={{
                      color: loading ? '#c8aa6e' : done ? '#5b5a56' : '#3d3c38',
                    }}>
                      {!visible ? 'En espera' : loading ? 'Conectando...' : source.doneLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-2 pt-2 flex items-center justify-between" style={{ borderTop: '1px solid rgba(10,203,230,0.06)' }}>
            <span className="text-[7px]" style={{ color: '#3d3c38' }}>
              Actualizado: <span style={{ color: '#5b5a56' }}>{version?.fetchedAt ? `${formatDate(version.fetchedAt)} ${formatTime(version.fetchedAt)}` : '...'}</span>
            </span>
            <span className="text-[7px]" style={{ color: '#3d3c38' }}>
              Cache: <span style={{ color: '#5b5a56' }}>30 min</span>
            </span>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div className="w-full space-y-1.5 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
          {steps.map((s, i) => (
            <motion.div key={i} className="flex items-center gap-2 px-0.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 + i * 0.1, duration: 0.2 }}>
              <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{
                background: s.done ? 'rgba(15,186,129,0.12)' : i === activeStepIdx ? 'rgba(200,170,110,0.12)' : 'rgba(91,90,86,0.05)',
                border: `1px solid ${s.done ? 'rgba(15,186,129,0.25)' : i === activeStepIdx ? 'rgba(200,170,110,0.25)' : 'rgba(91,90,86,0.08)'}`,
              }}>
                {s.done ? (
                  <svg className="w-2.5 h-2.5" style={{ color: '#0fba81' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === activeStepIdx ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-2.5 h-2.5 rounded-sm" style={{ border: '1.5px solid rgba(200,170,110,0.2)', borderTopColor: '#c8aa6e' }} />
                ) : (
                  <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(91,90,86,0.2)' }} />
                )}
              </div>
              <span className="text-[10px]" style={{ color: s.done ? '#0fba8180' : i === activeStepIdx ? '#c8aa6e' : '#3d3c38' }}>{s.label}</span>
              {i === activeStepIdx && (
                <motion.div className="flex gap-0.5 ml-auto">
                  {[0, 1, 2].map(d => (
                    <motion.div key={d} className="w-[3px] h-[3px] rounded-full" style={{ background: '#c8aa6e' }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats footer */}
        <motion.div className="w-full rounded-xl p-2.5"
          style={{ background: 'rgba(30,35,40,0.4)', border: '1px solid rgba(200,170,110,0.05)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.4 }}>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Campeones</p>
              <p className="text-sm font-bold font-mono" style={{ color: '#f0e6d2' }}>167</p>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(200,170,110,0.06)' }} />
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Fuentes</p>
              <p className="text-sm font-bold font-mono" style={{ color: '#f0e6d2' }}>{doneCount}/{sources.length}</p>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(200,170,110,0.06)' }} />
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Estado</p>
              <p className="text-sm font-bold" style={{ color: doneCount === sources.length ? '#0fba81' : '#f0c646' }}>
                {doneCount === sources.length ? 'Listo' : 'Cargando'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===== ENTRAR BUTTON — appears after all sources done (~12s) ===== */}
        <AnimatePresence>
          {allDone && onSkip && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 200 }}
              className="mt-5 w-full"
            >
              {/* Ready indicator */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#0fba81' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#0fba81' }}>
                  Todos los datos cargados
                </span>
              </div>

              {/* Main CTA button */}
              <motion.button
                type="button"
                onClick={onSkip}
                className="w-full py-3.5 rounded-xl text-sm font-bold tracking-[0.12em] uppercase transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #c8aa6e, #785a28)',
                  border: '1.5px solid rgba(200,170,110,0.5)',
                  color: '#0a0e1a',
                  boxShadow: '0 0 30px rgba(200,170,110,0.25), 0 4px 20px rgba(0,0,0,0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(200,170,110,0.35), 0 6px 24px rgba(0,0,0,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Sword className="w-4 h-4" />
                  <span>Entrar a MOBA SAGE</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>

              <p className="text-center text-[9px] mt-2.5 tracking-wider" style={{ color: '#5b5a56' }}>
                167 campeones · 7 fuentes · Listo para jugar
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom shimmer */}
        <motion.div className="w-full h-[1px] mt-4 rounded-full overflow-hidden" style={{ background: 'rgba(200,170,110,0.04)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.3 }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,170,110,0.4), transparent)', width: '40%' }}
            initial={{ x: '-40%' }} animate={{ x: '140%' }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        </motion.div>

        <motion.p className="text-[7px] mt-2.5 tracking-wider" style={{ color: '#2a2a26' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.3 }}>
          MOBA SAGE v0.3.0 — Datos de Riot Games y comunidad — No afiliado a Riot Games
        </motion.p>
      </div>
    </motion.div>
  );
}
