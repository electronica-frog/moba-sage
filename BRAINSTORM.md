# MOBA SAGE — Lluvia de Ideas & Backlog

**Fecha**: 2026-04-18
**Estado**: Notas de sesión — Sin confirmar

---

## Estado Actual de la App

- **Champions**: 73 (52 LoL + 21 WR) — 3 tiers (S/A/B)
- **Tabs**: 8 (Tier List, Parches, Cosas Rotas, Tareas, Roadmap, Combos, Competitivo, Perfil)
- **Regiones**: 16
- **APIs reales**: version (Riot CDN), community-builds (CommunityDragon), ai-reason (z-ai-web-dev-sdk), summoner (demo + Riot API)
- **Monolito**: page.tsx = 2,342 líneas — TODO refactor
- **Dependencias sin uso**: ~35 de 45 paquetes

---

## IDEAS POR CATEGORÍA

### 🔥 ESTÉTICA & VISUAL

| # | Idea | Descripción |
|---|------|-------------|
| E1 | Partículas doradas flotantes | Efecto de polvo dorado tipo client de LoL en el fondo. Framer Motion + canvas |
| E2 | Font Beaufort para títulos | Font oficial de LoL via Google Fonts/@font-face para headings |
| E3 | Splash Art Gallery en modal | Carousel de splashes (clásico, PROJECT, Mecha) con parallax |
| E4 | Iconos de rol visuales | SVG custom: Top (Espada), Jungle (Zarpa), Mid (Varita), ADC (Arco), Support (Escudo) |
| E5 | Tier List estilo board | Grid de avatares grandes clickeables como OP.GG en vez de lista plana |
| E6 | Loading screen animada | Spinner estilo LoL con logo girando + "Cargando..." dorado |
| E7 | Dark mode variants | "Blue Essence", "Red Essence", "Prestige" (negro + dorado). Toggle en header |
| E8 | Mini-map decorativo | Mapa de Summoner's Rift como fondo con campeones posicionados por rol |
| E9 | Runas visuales con iconos | Iconos reales de Data Dragon (RunesReforged) en vez de texto |
| E10 | Transición entre juegos | Flash dorado / golpe de espada al cambiar LoL ↔ WR |
| E11 | Gold pulse más prominente | Animación dorada pulsante en badges "S-Tier" y "En vivo" |
| E12 | Skill icons en builds | Mostrar iconos de habilidades junto a las descripciones en el modal |
| E13 | Mapa visión interactivo | Mini-mapa con wards placement recomendado por rol |
| E14 | Splash arts en landing | Carrusel de splash arts en la landing page |

### ⚡ FUNCIONALIDADES NUEVAS

| # | Idea | Descripción |
|---|------|-------------|
| F1 | Chat IA flotante | Botón "Pregúntale al Sage" conectado a /api/ai-reason. Chat en esquina inferior derecha |
| F2 | Comparador de Campeones | Side-by-side: stats, WR, counters, synergies de 2 campeones |
| F3 | Builder de Comp | Arrastrar 5 campeones → analizar synergies, counters, WR de la comp |
| F4 | Draft Assistant | Flujo de decisión: ¿qué pick contra X? → ¿qué sinergia con Y? |
| F5 | Counter Picker Tool | Input: campeón enemigo → Output: top 3 counters con WR y razones |
| F6 | Alertas de Parche | Badge "NUEVO PARCHE" cuando cambia la versión. Polling /api/version |
| F7 | Ranked Distribution | Tab nueva con distribución de ranks por región (Hierro → Challenger) |
| F8 | Meta Tracker | Gráfico de línea: WR del campeón parche a parche. Datos CommunityDragon |
| F9 | Perfil Real con Riot API | Conectar de verdad: match history, masteries, LP gains |
| F10 | PWA | manifest.json + service worker. Instalable en celu. Notificaciones push |
| F11 | Favoritos (localStorage) | Marcar campeones ★. Sección "Mis Campeones" o filtro |
| F12 | Copy Build to Clipboard | Botón que copia items como texto para pegar en el client |
| F13 | Share Link | URL compartible: moba-sage.vercel.app/champion/yasuo |
| F14 | Onboarding / Tour | Primer uso: tooltips guiados por las tabs |
| F15 | Búsqueda predictiva | Autocomplete al escribir nombre de campeón |
| F16 | Historial de vistas | "Últimos vistos" en Tier List |
| F17 | Temporadas/Etapas por campeón | "Early game", "Mid game", "Late game" con power curves |
| F18 | Notas personales por campeón | Textarea editable en modal para notas del usuario (localStorage) |

### 🛠️ MEJORAS TÉCNICAS

| # | Idea | Descripción |
|---|------|-------------|
| T1 | Refactor monolito | Dividir page.tsx (2342 líneas) en componentes: TierList.tsx, ChampionModal.tsx, etc. |
| T2 | Limpiar dependencias | Remover ~35 paquetes sin uso. Reducir bundle size |
| T3 | Data Dragon version dinámico | Sync automático en vez de hardcoded 14.8.1 |
| T4 | Fix TypeScript | Sacar ignoreBuildErrors:true. Limpiar tipos duplicados |
| T5 | Usar Prisma | Migrar data hardcodeada a SQLite para edición via UI |
| T6 | Accessibility (a11y) | ARIA labels, keyboard nav, focus trapping en modales |
| T7 | reactStrictMode: true | Activar para cachar bugs de double-rendering |
| T8 | Skeleton loaders | Usar Skeleton de shadcn para loading states |
| T9 | Toast notifications | Usar Sonner para feedback: copiar, buscar, cambiar región |
| T10 | Error boundaries | Catch errors gracefully sin romper toda la app |
| T11 | SEO / Meta tags | Open Graph, Twitter Cards, meta description para compartir |
| T12 | Imagenes optimizadas | next/image para los splash arts y champion icons |

### 📊 DATA & CONTENIDO

| # | Idea | Descripción |
|---|------|-------------|
| D1 | Parches reales | Scrapear notas de parche del blog de Riot / CommunityDragon |
| D2 | 100% datos completos | aiAnalysis + runes detalladas + counters/synergies para TODOS los campeones |
| D3 | Pro Picks reales | Scrapear de gol.gg u Oracle's Elixir |
| D4 | Counters con datos reales | WR de matchups (ej: "Darius vs Garen: 54.2%") de champion.gg |
| D5 | Tier List automático | Calcular tier basado en WR + Pick Rate + Ban Rate reales |
| D6 | Runas populares | Top 3 rune pages por campeón desde CommunityDragon |

---

## QUICK WINS PROPUestos (Orden Prioridad)

> Impacto visual/funcional alto + esfuerzo bajo/medio

| Rank | Quick Win | Impacto | Esfuerzo | Categoría |
|------|-----------|---------|----------|-----------|
| **1** | 🌟 Partículas doradas flotantes | 🔥🔥🔥 | Bajo | Estética |
| **2** | 🤖 Chat IA flotante | 🔥🔥🔥 | Medio | Funcional |
| **3** | 📋 Copy Build to Clipboard | 🔥🔥 | Bajo | Funcional |
| **4** | 🔤 Font Beaufort para títulos | 🔥🔥 | Bajo | Estética |
| **5** | 🌟 Alertas "NUEVO PARCHE" | 🔥🔥 | Bajo | Funcional |
| **6** | 📋 Counter Picker Tool | 🔥🔥🔥 | Medio | Funcional |
| **7** | 🔔 Toast notifications (Sonner) | 🔥🔥 | Bajo | Técnico |
| **8** | 📋 Comparador de Campeones | 🔥🔥🔥 | Medio | Funcional |
| **9** | ⭐ Favoritos (localStorage) | 🔥🔥 | Bajo | Funcional |
| **10** | 💀 Skeleton loaders | 🔥 | Bajo | Técnico |
| **11** | 🔍 Búsqueda predictiva | 🔥🔥 | Bajo | Funcional |
| **12** | 📋 Colapsar/expandir en modal | 🔥 | Bajo | UX |
| **13** | 🖼️ Runas con iconos reales | 🔥🔥 | Bajo | Visual |
| **14** | 🔄 Data Dragon version sync | 🔥 | Bajo | Técnico |
| **15** | ✨ Transición entre juegos | 🔥🔥 | Bajo | Estética |

---

## SEGUIMIENTO

> Marcar con ✅ cuando se implemente, ❌ cuando se descarte, 🔄 cuando esté en progreso

---

*Última actualización: 2026-04-18*
