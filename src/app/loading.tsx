export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0a0e1a' }}
    >
      {/* Animated crystal spinner */}
      <div className="relative mb-8">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            border: '3px solid rgba(200,170,110,0.15)',
            borderTopColor: '#c8aa6e',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div
          className="absolute inset-0 w-16 h-16 rounded-full"
          style={{
            border: '3px solid transparent',
            borderBottomColor: 'rgba(10,203,230,0.6)',
            animation: 'spin 1.5s linear infinite reverse',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: '#c8aa6e',
            boxShadow: '0 0 15px rgba(200,170,110,0.5)',
          }}
        />
      </div>

      {/* Title */}
      <h1
        className="text-2xl font-black tracking-widest mb-2"
        style={{
          color: '#c8aa6e',
          fontFamily: 'var(--font-cinzel), serif',
          textShadow: '0 0 30px rgba(200,170,110,0.2)',
        }}
      >
        MOBA SAGE
      </h1>

      {/* Skeleton bars */}
      <div className="flex flex-col items-center gap-3 mt-4 w-64">
        <div
          className="h-2 rounded-full w-full"
          style={{
            background: 'linear-gradient(90deg, rgba(200,170,110,0.08) 25%, rgba(200,170,110,0.15) 50%, rgba(200,170,110,0.08) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
        <div
          className="h-2 rounded-full w-3/4"
          style={{
            background: 'linear-gradient(90deg, rgba(200,170,110,0.08) 25%, rgba(200,170,110,0.15) 50%, rgba(200,170,110,0.08) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite 0.2s',
          }}
        />
        <div
          className="h-2 rounded-full w-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(200,170,110,0.08) 25%, rgba(200,170,110,0.15) 50%, rgba(200,170,110,0.08) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite 0.4s',
          }}
        />
      </div>

      <p className="text-[11px] mt-6 tracking-wider" style={{ color: '#5b5a56' }}>
        Cargando datos del meta...
      </p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
