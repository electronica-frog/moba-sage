interface SourceBadgeProps {
  source?: string;
  timestamp?: string;
  patch?: string;
  size?: 'sm' | 'xs';
}

export function SourceBadge({ source, timestamp, patch, size = 'sm' }: SourceBadgeProps) {
  const isSmall = size === 'xs';

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleString('es-AR', {
        timeZone: 'America/Buenos_Aires',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={`flex items-center gap-1.5 ${isSmall ? 'text-[10px]' : 'text-[10px]'} text-lol-muted`}>
      {source && (
        <>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-lol-gold/10 text-lol-gold font-medium">
            {source}
          </span>
        </>
      )}
      {patch && (
        <span className="text-lol-muted">
          {patch}
        </span>
      )}
      {formattedTime && (
        <span className="text-lol-muted/70">
          · {formattedTime}
        </span>
      )}
    </div>
  );
}

export function RiotAttribution({ size = 'xs' }: { size?: 'sm' | 'xs' }) {
  const isSmall = size === 'xs';
  return (
    <p className={`text-[${isSmall ? '8' : '9'}px] text-lol-muted/50 text-center mt-1`}>
      © Riot Games, Inc. League of Legends y todo el contenido son marcas de Riot Games, Inc.
    </p>
  );
}
