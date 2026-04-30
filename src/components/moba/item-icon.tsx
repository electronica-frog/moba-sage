'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getItemIconUrl } from './helpers';

export function ItemIcon({ name }: { name: string }) {
  const url = getItemIconUrl(name);
  const [err, setErr] = useState(false);
  if (!url || err) return <div className="w-6 h-6 rounded bg-lol-card flex items-center justify-center text-[10px] text-lol-dim border border-lol-gold-dark/20 shrink-0">{name[0]}</div>;
  return <Image src={url} alt={name} width={24} height={24} className="w-6 h-6 rounded shrink-0" style={{ border: '1px solid rgba(200,170,110,0.15)' }} loading="lazy" onError={() => setErr(true)} />;
}
