'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { getDdVersion } from './helpers';
import { CHAMPION_NAME_MAP } from './helpers';

interface SkillIconProps {
  championName: string;
  skill: 'Q' | 'W' | 'E' | 'R';
  size?: number;
}

const SKILL_COLORS: Record<string, string> = {
  Q: '#0acbe6',
  W: '#0fba81',
  E: '#f0c646',
  R: '#e84057',
};

export const SkillIcon = memo(function SkillIcon({ championName, skill, size = 32 }: SkillIconProps) {
  const [imgError, setImgError] = useState(false);
  const color = SKILL_COLORS[skill];

  // Build spell key from champion name
  const mapped = CHAMPION_NAME_MAP[championName];
  const champKey = mapped || championName.replace(/['\s.]/g, '');
  const version = getDdVersion();
  const spellKey = `${champKey}${skill}`;
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellKey}.png`;

  return (
    <div
      className="relative rounded-lg overflow-hidden shrink-0 group"
      style={{
        width: size,
        height: size,
        border: `1.5px solid ${color}50`,
        boxShadow: `0 0 8px ${color}15`,
      }}
      title={`${championName} - ${skill}`}
    >
      {!imgError ? (
        <Image
          src={iconUrl}
          alt={`${championName} ${skill}`}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-black"
          style={{
            backgroundColor: `${color}20`,
            color,
            fontSize: size * 0.45,
          }}
        >
          {skill}
        </div>
      )}
      {/* Ability key overlay - only show when image loaded successfully */}
      {!imgError && (
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center text-[8px] font-black"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#f0e6d2',
            borderTopLeftRadius: '2px',
          }}
        >
          {skill}
        </div>
      )}
    </div>
  );
});

export function AbilityBar({ championName }: { championName: string }) {
  const skills: Array<'Q' | 'W' | 'E' | 'R'> = ['Q', 'W', 'E', 'R'];
  return (
    <div className="flex items-center gap-1.5">
      {skills.map(skill => (
        <SkillIcon key={skill} championName={championName} skill={skill} size={32} />
      ))}
    </div>
  );
}
