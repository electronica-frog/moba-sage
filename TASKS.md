# TASKS — MOBA SAGE

## TICK ACTUAL: #5

## DEV CRON ROTATION
El TICK existente (93015) debería disparar esta rotación cíclica de 4 tareas:

| Ciclo | Task | Frecuencia sugerida | Feed actualizado |
|-------|------|---------------------|------------------|
| 1 | DEV_PATCHES | Cada 2h | public/patches-feed.json |
| 2 | DEV_TIERLIST | Cada 4h | public/tierlist-feed.json |
| 3 | DEV_GUIDES | Cada 6h | public/guides-feed.json |
| 4 | DEV_MAINTENANCE | Daily | public/activity-feed.json |

### Payload sugerido para TICK 93015:
```
Eres moba-sage dev bot. Lee TASKS.md y ejecuta la siguiente rotación:

Si (tick_number % 4 == 1): Ejecuta DEV_PATCHES — web search "LoL patch notes", "Valorant patch", "Dota patch", "CS2 update". Actualiza public/patches-feed.json con nuevos patches. Push con git.

Si (tick_number % 4 == 2): Ejecuta DEV_TIERLIST — web search "LoL tier list", "Valorant tier list", "CS2 tier list". Actualiza public/tierlist-feed.json. Push con git.

Si (tick_number % 4 == 3): Ejecuta DEV_GUIDES — web search "LoL guide", "Valorant meta". Genera guides en data/guides/ y actualiza public/guides-feed.json. Push con git.

Si (tick_number % 4 == 0): Ejecuta DEV_MAINTENANCE — limpiar data stale, actualizar public/activity-feed.json con fecha actual. Push con git.

Siempre usar git config user.email "bautiarmanijuegos@gmail.com" y user.name "bautiarmanijuegos" antes de push.
Repo: gamer-frog/moba-sage, branch: main.
```

## TAREAS PENDIENTES

### [ ] T4: Configurar CRON de mantenimiento
- Descripción: TICK 93015 necesita payload actualizado con rotación DEV (ver sección DEV CRON ROTATION arriba). El servicio de crons retorna 401 desde esta sandbox — requiere acceso admin.
- Prioridad: ALTA
- Notas: Payload listo arriba. Solo falta aplicarlo al cron 93015 desde interfaz admin.

### [ ] T5: Mejorar Cosas Rotas con splash arts
- Descripción: Agregar imágenes de splash art de campeones en la sección Cosas Rotas
- Prioridad: MEDIA
- Notas: Ya tiene TinyChampionIcon. Mejorar con splash art más grande.

### [ ] T6: Datos de Wild Rift reales
- Descripción: Agregar campeones, tier list y datos para Wild Rift (no solo "coming soon")
- Prioridad: MEDIA
- Notas: Requiere datos de Riot para Wild Rift.

### [ ] T7: Runas óptimas por campeón
- Descripción: Agregar runas recomendadas para cada campeón S/A tier
- Prioridad: MEDIA
- Notas: Agregar campo `runes` con página + fragmentos óptimos.

### [ ] T8: Mejorar tier list con más data visual
- Descripción: Agregar sparklines de win rate, mini gráficos comparativos
- Prioridad: BAJA
- Notas: Mejora visual para la experiencia de usuario.

### [ ] T9: PWA support
- Descripción: Agregar manifest.json, service worker, soporte offline
- Prioridad: BAJA
- Notas: Hacer la app instalable en móviles.

## TAREAS COMPLETADAS
- [x] T1: Setup inicial CHECKLIST (DASHBOARD.md + TASKS.md)
- [x] T2: Fix y push de cambios staged — Sync con remote + patch update 14.8→16.8
- [x] T3: Documentar pipeline TAREAS — Pipeline documentado en DASHBOARD.md (14 tareas + CRONS)
