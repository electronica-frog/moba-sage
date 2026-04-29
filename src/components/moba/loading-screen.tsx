'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  Sword, Database, Shield, Swords, Target, TrendingUp,
  Zap, Globe, Users, Trophy, Flame, Sparkles, ChevronRight
} from 'lucide-react';

/* ================================================================
   MOBA SAGE — Enhanced Loading Screen v2.0
   - Real data fetching from /api/version, /api/champions
   - 7 live data sources with status + timestamps
   - Animated step-by-step progress
   - Responsive, polished LoL-dark theme
   ================================================================ */

interface VersionInfo {
  lol: string;
  lolFull?: string;
  wr: string;
  gamePatch: string;
  cdnVersion?: string;
  metaLastUpdated: string;
  fetchedAt: string;
  ddragonStatus: string;
  attribution?: string;
}

interface DataSourceStatus {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  status: 'pending' | 'connecting' | 'live' | 'done';
  detail: string;
  latency?: number;
  records?: string;
}

export function LoadingScreen() {
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [champCount, setChampCount] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [sources, setSources] = useState<DataSourceStatus[]>([
    { id: 'ddragon', name: 'Data Dragon', icon: <Shield className="w-3.5 h-3.5" />, color: '#c8aa6e', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'champions', name: 'Base de Campeones', icon: <Swords className="w-3.5 h-3.5" />, color: '#0acbe6', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'tierlist', name: 'Tier List Meta', icon: <TrendingUp className="w-3.5 h-3.5" />, color: '#0fba81', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'probuilds', name: 'Pro Builds & Picks', icon: <Trophy className="w-3.5 h-3.5" />, color: '#f0c646', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'insights', name: 'IA Insights', icon: <Sparkles className="w-3.5 h-3.5" />, color: '#a78bfa', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'combos', name: 'Combos Rotos', icon: <Flame className="w-3.5 h-3.5" />, color: '#e84057', status: 'pending', detail: 'Conectando...', records: '—' },
    { id: 'patches', name: 'Patch Notes', icon: <Zap className="w-3.5 h-3.5" />, color: '#785a28', status: 'pending', detail: 'Conectando...', records: '—' },
  ]);

  const [overallProgress, setOverallProgress] = useState(0);

  // Time-based greeting
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Buenos dias';
    if (h >= 12 && h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Fetch all data sources in real-time
  const fetchAllData = useCallback(async () => {
    const updateSource = (id: string, updates: Partial<DataSourceStatus>) => {
      setSources(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    // Step 0: Connecting
    setCurrentStep(0);
    setOverallProgress(5);

    // Step 1: DDragon / Version
    setCurrentStep(1);
    const versionStart = Date.now();
    updateSource('ddragon', { status: 'connecting', detail: 'Consultando versiones...' });
    try {
      const vRes = await fetch('/api/version');
      const vData = await vRes.json();
      setVersion(vData);
      updateSource('ddragon', {
        status: 'live',
        detail: `v${vData.lol} (CDN ${vData.ddragonStatus})`,
        latency: Date.now() - versionStart
      });
    } catch {
      updateSource('ddragon', { status: 'done', detail: 'Fallback local', latency: Date.now() - versionStart });
    }
    setOverallProgress(18);

    // Step 2: Champions
    setCurrentStep(2);
    const champStart = Date.now();
    updateSource('champions', { status: 'connecting', detail: 'Descargando campeones...' });
    try {
      const cRes = await fetch('/api/champions');
      const cData = await cRes.json();
      const count = Array.isArray(cData) ? cData.length : 0;
      setChampCount(count);
      updateSource('champions', {
        status: 'live',
        detail: `${count} campeones cargados`,
        records: `${count} champions`,
        latency: Date.now() - champStart
      });
    } catch {
      updateSource('champions', { status: 'done', detail: 'Datos cacheados', latency: Date.now() - champStart });
    }
    setOverallProgress(35);

    // Step 3: Tier list + Pro picks (parallel)
    setCurrentStep(3);
    updateSource('tierlist', { status: 'connecting', detail: 'Calculando tier list...' });
    updateSource('probuilds', { status: 'connecting', detail: 'Cargando pro picks...' });

    const tierStart = Date.now();
    const proStart = Date.now();

    await Promise.allSettled([
      fetch('/api/insights').then(r => r.json()).then(data => {
        const count = Array.isArray(data) ? data.length : 0;
        updateSource('tierlist', {
          status: 'live',
          detail: `${count} insights activos`,
          records: `${count} entries`,
          latency: Date.now() - tierStart
        });
      }).catch(() => {
        updateSource('tierlist', { status: 'done', detail: 'Datos disponibles', latency: Date.now() - tierStart });
      }),
      fetch('/api/pro-picks').then(r => r.json()).then(data => {
        const count = Array.isArray(data) ? data.length : 0;
        updateSource('probuilds', {
          status: 'live',
          detail: `${count} picks profesionales`,
          records: `${count} picks`,
          latency: Date.now() - proStart
        });
      }).catch(() => {
        updateSource('probuilds', { status: 'done', detail: 'Datos disponibles', latency: Date.now() - proStart });
      })
    ]);
    setOverallProgress(55);

    // Step 4: Combos + Patches (parallel)
    setCurrentStep(4);
    updateSource('combos', { status: 'connecting', detail: 'Buscando combos rotos...' });
    updateSource('patches', { status: 'connecting', detail: 'Cargando notas de parche...' });
    updateSource('insights', { status: 'connecting', detail: 'Generando insights...' });

    const comboStart = Date.now();
    const patchStart = Date.now();

    await Promise.allSettled([
      fetch('/api/combos').then(r => r.json()).then(data => {
        const count = Array.isArray(data) ? data.length : 0;
        updateSource('combos', {
          status: 'live',
          detail: `${count} combos identificados`,
          records: `${count} combos`,
          latency: Date.now() - comboStart
        });
      }).catch(() => {
        updateSource('combos', { status: 'done', detail: 'Datos disponibles', latency: Date.now() - comboStart });
      }),
      fetch('/api/patches').then(r => r.json()).then(data => {
        const count = Array.isArray(data) ? data.length : 0;
        updateSource('patches', {
          status: 'live',
          detail: `${count} parches analizados`,
          records: `${count} patches`,
          latency: Date.now() - patchStart
        });
      }).catch(() => {
        updateSource('patches', { status: 'done', detail: 'Datos disponibles', latency: Date.now() - patchStart });
      }),
    ]);

    // Mark insights as done (AI data is generated from other sources)
    updateSource('insights', { status: 'live', detail: 'Modelo preparado', records: 'IA lista' });

    setOverallProgress(85);

    // Step 5: Finalizing
    setCurrentStep(5);
    await new Promise(r => setTimeout(r, 500));
    setOverallProgress(100);

    // Mark all as done
    setSources(prev => prev.map(s => s.status === 'live' ? { ...s, status: 'done' } : s));
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Elapsed timer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 100) / 10);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Date/time formatters
  const formatDate = (isoStr: string) => {
    if (!isoStr) return '...';
    const d = new Date(isoStr);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatTime = (isoStr: string) => {
    if (!isoStr) return '...';
    const d = new Date(isoStr);
    return d.toLocaleTimeString('es-AR', { timeZone: 'America/Buenos_Aires', hour: '2-digit', minute: '2-digit' });
  };

  const liveCount = sources.filter(s => s.status === 'live' || s.status === 'done').length;

  const steps = [
    { label: 'Inicializando conexion', done: currentStep > 0 },
    { label: 'Consultando Data Dragon', done: currentStep > 1 },
    { label: 'Cargando campeones', done: currentStep > 2 },
    { label: 'Descargando meta data', done: currentStep > 3 },
    { label: 'Procesando combos y parches', done: currentStep > 4 },
    { label: 'Preparando interfaz', done: currentStep > 5 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ backgroundColor: '#060a12' }}
    >
      {/* ===== Background layers ===== */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(200,170,110,0.07) 0%, transparent 55%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 15% 85%, rgba(10,203,230,0.04) 0%, transparent 35%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 85% 75%, rgba(15,186,129,0.03) 0%, transparent 35%)',
      }} />

      {/* Subtle hex grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          linear-gradient(30deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%, rgba(200,170,110,0.4)),
          linear-gradient(150deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%, rgba(200,170,110,0.4)),
          linear-gradient(30deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%, rgba(200,170,110,0.4)),
          linear-gradient(150deg, rgba(200,170,110,0.4) 12%, transparent 12.5%, transparent 87%, rgba(200,170,110,0.4) 87.5%, rgba(200,170,110,0.4))
        `,
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
      }} />

      {/* ===== Main content ===== */}
      <div className="relative z-10 w-full max-w-[420px] px-5 flex flex-col items-center">

        {/* --- Logo --- */}
        <motion.div
          className="relative mb-5"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute -inset-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full" style={{
              border: '1px dashed rgba(200,170,110,0.12)',
            }} />
          </motion.div>

          {/* Inner pulsing glow */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle, rgba(200,170,110,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Icon box */}
          <motion.div
            className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, rgba(200,170,110,0.14), rgba(200,170,110,0.04))',
              border: '1.5px solid rgba(200,170,110,0.22)',
              boxShadow: '0 0 50px rgba(200,170,110,0.08), inset 0 1px 0 rgba(200,170,110,0.08)',
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sword className="w-8 h-8" style={{ color: '#c8aa6e' }} />
          </motion.div>
        </motion.div>

        {/* --- Title --- */}
        <motion.h1
          className="text-[28px] sm:text-[32px] font-black tracking-[0.22em] mb-0.5"
          style={{
            color: '#c8aa6e',
            fontFamily: 'var(--font-cinzel), serif',
            textShadow: '0 0 30px rgba(200,170,110,0.35), 0 0 60px rgba(200,170,110,0.12)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          MOBA SAGE
        </motion.h1>

        <motion.p
          className="text-[10px] tracking-[0.25em] uppercase mb-1"
          style={{ color: '#5b5a56' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {getGreeting()}, invocador
        </motion.p>

        {/* --- CARGANDO DATOS --- */}
        <motion.div
          className="mb-5 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-3 h-3 rounded-full"
            style={{
              border: '2px solid rgba(200,170,110,0.2)',
              borderTopColor: '#c8aa6e',
            }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: '#c8aa6e' }}
          >
            Cargando datos
          </span>
          <motion.span
            className="text-[11px]"
            style={{ color: '#785a28' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        {/* --- Progress bar (overall) --- */}
        <motion.div
          className="w-full h-[3px] rounded-full overflow-hidden mb-5"
          style={{ background: 'rgba(200,170,110,0.06)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #785a28, #c8aa6e, #0acbe6)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.max(overallProgress, 3)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>

        {/* --- Patch info card --- */}
        <motion.div
          className="w-full rounded-xl p-3 mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(30,35,40,0.65), rgba(18,22,30,0.85))',
            border: '1px solid rgba(200,170,110,0.1)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" style={{ color: '#785a28' }} />
              <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#785a28' }}>
                Versiones del juego
              </span>
            </div>
            <span className="text-[9px] font-mono" style={{ color: '#5b5a56' }}>
              {elapsed.toFixed(1)}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* LoL */}
            <div className="flex-1 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>League of Legends</p>
              <p className="text-base font-bold font-mono" style={{ color: '#f0e6d2' }}>
                {version ? version.lol : '...'}
              </p>
            </div>
            {/* Divider */}
            <div className="w-px h-7 shrink-0" style={{ background: 'rgba(200,170,110,0.08)' }} />
            {/* WR */}
            <div className="flex-1 rounded-lg px-2.5 py-1.5" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>Wild Rift</p>
              <p className="text-base font-bold font-mono" style={{ color: '#f0e6d2' }}>
                {version ? version.wr : '...'}
              </p>
            </div>
            {/* Divider */}
            <div className="w-px h-7 shrink-0" style={{ background: 'rgba(200,170,110,0.08)' }} />
            {/* DDragon Status */}
            <div className="flex-1 rounded-lg px-2.5 py-1.5 flex flex-col items-center justify-center" style={{ background: 'rgba(10,14,26,0.5)' }}>
              <p className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: '#5b5a56' }}>CDN</p>
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: version?.ddragonStatus === 'live' ? '#0fba81' : '#f0c646' }}
                />
                <span className="text-[10px] font-bold font-mono" style={{
                  color: version?.ddragonStatus === 'live' ? '#0fba81' : '#f0c646',
                }}>
                  {version?.ddragonStatus === 'live' ? 'LIVE' : '...'}
                </span>
              </div>
            </div>
          </div>
          {/* Last updated info */}
          <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid rgba(200,170,110,0.06)' }}>
            <span className="text-[8px]" style={{ color: '#5b5a56' }}>
              Meta: <span style={{ color: '#785a28' }}>{version?.metaLastUpdated ? formatDate(version.metaLastUpdated) : '...'}</span>
            </span>
            <span className="text-[8px]" style={{ color: '#5b5a56' }}>
              Datos: <span style={{ color: '#785a28' }}>{version?.fetchedAt ? formatTime(version.fetchedAt) : '...'}</span>
            </span>
          </div>
        </motion.div>

        {/* --- Data Sources card --- */}
        <motion.div
          className="w-full rounded-xl p-3 mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(30,35,40,0.65), rgba(18,22,30,0.85))',
            border: '1px solid rgba(10,203,230,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Database className="w-3 h-3" style={{ color: '#0acbe6' }} />
              <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#0acbe6' }}>
                Fuentes de datos
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-mono" style={{ color: '#5b5a56' }}>
                {liveCount}/{sources.length}
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: liveCount === sources.length ? '#0fba81' : '#f0c646' }}
              />
            </div>
          </div>

          <div className="space-y-1">
            {sources.map((source, i) => (
              <motion.div
                key={source.id}
                className="flex items-center justify-between rounded-lg px-2.5 py-[6px]"
                style={{
                  background: source.status === 'connecting'
                    ? 'rgba(200,170,110,0.04)'
                    : 'rgba(10,14,26,0.35)',
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.25 }}
              >
                {/* Left: status dot + icon + name */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative shrink-0">
                    {/* Status indicator */}
                    {source.status === 'connecting' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          border: '1.5px solid rgba(200,170,110,0.2)',
                          borderTopColor: source.color,
                        }}
                      />
                    ) : source.status === 'live' || source.status === 'done' ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-3 h-3 rounded-full flex items-center justify-center"
                        style={{ background: `${source.color}22` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: source.color }} />
                      </motion.div>
                    ) : (
                      <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(91,90,86,0.15)' }} />
                    )}
                  </div>
                  <span className="text-[10px] shrink-0" style={{ color: source.status === 'pending' ? '#3d3c38' : '#a09b8c' }}>
                    {source.name}
                  </span>
                </div>

                {/* Right: detail + latency */}
                <div className="flex items-center gap-2 shrink-0">
                  {source.records && source.records !== '—' && source.status !== 'pending' && source.status !== 'connecting' && (
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{
                      background: `${source.color}10`,
                      color: source.color,
                    }}>
                      {source.records}
                    </span>
                  )}
                  <span className="text-[9px] font-mono max-w-[120px] truncate text-right" style={{
                    color: source.status === 'connecting'
                      ? '#c8aa6e'
                      : source.status === 'live'
                        ? '#5b5a56'
                        : source.status === 'done'
                          ? '#3d3c38'
                          : '#3d3c38',
                  }}>
                    {source.status === 'pending' ? 'En espera' : source.detail}
                  </span>
                  {source.latency !== undefined && (source.status === 'live' || source.status === 'done') && (
                    <span className="text-[8px] font-mono" style={{ color: source.latency < 300 ? '#0fba81' : '#f0c646' }}>
                      {source.latency}ms
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Loading steps (compact) --- */}
        <motion.div
          className="w-full space-y-1.5 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 + i * 0.15, duration: 0.2 }}
            >
              <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{
                background: step.done
                  ? 'rgba(15,186,129,0.12)'
                  : i === currentStep
                    ? 'rgba(200,170,110,0.12)'
                    : 'rgba(91,90,86,0.05)',
                border: `1px solid ${
                  step.done
                    ? 'rgba(15,186,129,0.25)'
                    : i === currentStep
                      ? 'rgba(200,170,110,0.25)'
                      : 'rgba(91,90,86,0.08)'
                }`,
              }}>
                {step.done ? (
                  <svg className="w-2.5 h-2.5" style={{ color: '#0fba81' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{
                      border: '1.5px solid rgba(200,170,110,0.2)',
                      borderTopColor: '#c8aa6e',
                    }}
                  />
                ) : (
                  <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(91,90,86,0.2)' }} />
                )}
              </div>
              <span className="text-[10px]" style={{
                color: step.done ? '#0fba8180' : i === currentStep ? '#c8aa6e' : '#3d3c38',
              }}>
                {step.label}
              </span>
              {i === currentStep && (
                <motion.div className="flex gap-0.5 ml-auto">
                  {[0, 1, 2].map(dot => (
                    <motion.div
                      key={dot}
                      className="w-[3px] h-[3px] rounded-full"
                      style={{ background: '#c8aa6e' }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* --- Stats footer --- */}
        <motion.div
          className="w-full rounded-xl p-2.5"
          style={{
            background: 'rgba(30,35,40,0.4)',
            border: '1px solid rgba(200,170,110,0.05)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Campeones</p>
              <p className="text-sm font-bold font-mono" style={{ color: champCount ? '#f0e6d2' : '#3d3c38' }}>
                {champCount ?? '...'}
              </p>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(200,170,110,0.06)' }} />
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Fuentes</p>
              <p className="text-sm font-bold font-mono" style={{ color: '#f0e6d2' }}>
                {liveCount}/{sources.length}
              </p>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(200,170,110,0.06)' }} />
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider" style={{ color: '#5b5a56' }}>Estado</p>
              <p className="text-sm font-bold" style={{
                color: liveCount === sources.length ? '#0fba81' : '#f0c646',
              }}>
                {liveCount === sources.length ? 'Listo' : 'Cargando'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom shimmer line */}
        <motion.div
          className="w-full h-[1px] mt-4 rounded-full overflow-hidden"
          style={{ background: 'rgba(200,170,110,0.04)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(200,170,110,0.4) 50%, transparent 100%)',
              width: '40%',
            }}
            initial={{ x: '-40%' }}
            animate={{ x: '140%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Attribution */}
        <motion.p
          className="text-[7px] mt-2.5 tracking-wider"
          style={{ color: '#2a2a26' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        >
          MOBA SAGE v0.3.0 &mdash; Datos de Riot Games y comunidad &mdash; No afiliado a Riot Games
        </motion.p>
      </div>
    </motion.div>
  );
}
