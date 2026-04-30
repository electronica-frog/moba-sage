'use client';

import { useState, useEffect, useCallback } from 'react';
import { updateDdVersion } from '@/components/moba/helpers';
import type {
  Champion, PatchNote, AiInsight, TaskItem,
  ProPick, BrokenCombo,
} from '@/components/moba/types';

interface LiveVersions {
  lol: string;
  wr: string;
  gamePatch: string;
  metaLastUpdated: string;
}

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Shared safeJson fetcher
const safeJson = async <T,>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json() as T;
  } catch (e) {
    console.warn(`[MOBA SAGE] Failed: ${url}`, e);
    return null;
  }
};

export function useGameData() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [patches, setPatches] = useState<PatchNote[]>([]);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [proPicks, setProPicks] = useState<ProPick[]>([]);
  const [combos, setCombos] = useState<BrokenCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [liveVersions, setLiveVersions] = useState<LiveVersions>({ lol: '', wr: '', gamePatch: '', metaLastUpdated: '' });
  const [lastUpdate, setLastUpdate] = useState('');
  const [isNewPatch, setIsNewPatch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Process version data (shared between initial fetch and silent refresh)
  const processVersionData = useCallback((versionData: { lol?: string; wr?: string; gamePatch?: string; metaLastUpdated?: string; fetchedAt?: string } | null) => {
    if (versionData?.lol) {
      const fullVer = versionData.lol;
      setLiveVersions({
        lol: fullVer.split('.').slice(0, 2).join('.'),
        wr: versionData.wr || '6.4',
        gamePatch: versionData.gamePatch || fullVer.split('.').slice(0, 2).join('.'),
        metaLastUpdated: versionData.metaLastUpdated || '',
      });
      updateDdVersion(fullVer);
      const prevPatch = localStorage.getItem('moba-sage-last-patch');
      const currentPatch = fullVer.split('.').slice(0, 2).join('.');
      if (prevPatch && prevPatch !== currentPatch) setIsNewPatch(true);
      localStorage.setItem('moba-sage-last-patch', currentPatch);
    }
    if (versionData?.fetchedAt) {
      const d = new Date(versionData.fetchedAt);
      setLastUpdate(`${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`);
    }
  }, []);

  // Initial data fetch (with loading overlay)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const [champsData, patchesData, insightsData, tasksData, proData, combosData, versionData] = await Promise.all<Promise<unknown>>([
        safeJson('/api/champions'),
        safeJson('/api/patches'),
        safeJson('/api/insights'),
        safeJson('/api/tasks'),
        safeJson('/api/pro-picks'),
        safeJson('/api/combos'),
        safeJson('/api/version'),
      ]) as [Champion[], PatchNote[], AiInsight[], TaskItem[], ProPick[], BrokenCombo[], { lol: string; wr: string; gamePatch: string; metaLastUpdated: string; fetchedAt?: string } | null];

      if (champsData) setChampions(champsData as Champion[]);
      if (patchesData) setPatches(patchesData as PatchNote[]);
      if (insightsData) setInsights(insightsData as AiInsight[]);
      if (tasksData) setTasks(tasksData as TaskItem[]);
      if (proData) setProPicks(proData as ProPick[]);
      if (combosData) setCombos(combosData as BrokenCombo[]);
      processVersionData(versionData);

      if (!champsData && !patchesData && !insightsData && !tasksData && !proData && !combosData && !versionData) {
        setFetchError(true);
      }
    } catch (err) {
      console.error('Unexpected error in fetchData:', err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [processVersionData]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Silent refresh (no loading overlay — no flicker)
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setFetchError(false);
    try {
      const [champsData, patchesData, insightsData, tasksData, proData, combosData, versionData] = await Promise.all<Promise<unknown>>([
        safeJson('/api/champions'),
        safeJson('/api/patches'),
        safeJson('/api/insights'),
        safeJson('/api/tasks'),
        safeJson('/api/pro-picks'),
        safeJson('/api/combos'),
        safeJson('/api/version'),
      ]) as [Champion[], PatchNote[], AiInsight[], TaskItem[], ProPick[], BrokenCombo[], { lol: string; wr: string; gamePatch: string; metaLastUpdated: string; fetchedAt?: string } | null];

      if (champsData) setChampions(champsData as Champion[]);
      if (patchesData) setPatches(patchesData as PatchNote[]);
      if (insightsData) setInsights(insightsData as AiInsight[]);
      if (tasksData) setTasks(tasksData as TaskItem[]);
      if (proData) setProPicks(proData as ProPick[]);
      if (combosData) setCombos(combosData as BrokenCombo[]);
      processVersionData(versionData);
    } catch (err) {
      console.error('Silent refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [processVersionData]);

  return {
    champions, patches, insights, tasks, proPicks, combos,
    loading, fetchError, liveVersions, lastUpdate, isNewPatch, isRefreshing,
    fetchData, handleRefresh,
    setTasks, setIsNewPatch,
  };
}
