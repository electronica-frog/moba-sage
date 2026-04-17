// ============================================================
// MOBA SAGE — Data Layer
// Fallback: Prisma (local) → Embedded data (Vercel/serverless)
// ============================================================

export interface Champion {
  id: number;
  name: string;
  title: string;
  role: string;
  tier: string;
  winRate: number;
  pickRate: number;
  banRate: number;
  image: string;
  aiInsight: string;
  build: string;
  runes: string;
  counters: string;
  synergies: string;
  patch: string;
  game: string;
  createdAt?: string;
  updatedAt?: string;
  // New fields
  builds?: { name: string; items: string; winRate: number }[];
  counterPick?: string;
  synergy?: string;
  aiAnalysis?: string;
  proPickRate?: number;
}

export interface PatchNote {
  id: number;
  version: string;
  title: string;
  summary: string;
  digest: string;
  date: string;
  sourceGame: string;
}

export interface AiInsight {
  id: number;
  champion: string;
  category: string;
  content: string;
  confidence: number;
  date: string;
}

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: string;
  pointer: number;
  interval: number;
}

export interface ProPick {
  id: number;
  champion: string;
  role: string;
  tournament: string;
  region: string;
  pickRate: number;
  banRate: number;
  winRate: number;
  patch: string;
}

// ============================================================
// EMBEDDED DATA (fallback when Prisma/SQLite isn't available)
// ============================================================

const CHAMPIONS_DATA: Omit<Champion, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Tier S — Dioses del Meta
  {
    name: 'Master Yi', title: 'Wuju Bladesman', role: 'Jungle', tier: 'S', winRate: 55.2, pickRate: 14.1, banRate: 12.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Oneshot', items: 'Filo de la Noche → Eclipse → Hydratación Letal → Última Piedad → Fuerza de la Trinidad', winRate: 54.8 },
      { name: 'Build Persistente', items: 'Eclipse → Hydratación Letal → Guardián de Angel → El Protegido → Botas de Mercurio', winRate: 52.1 },
    ],
    counterPick: 'Poppy, Malzahar, Jax',
    synergy: 'Taric, Master Yi + Taric es la composición más tóxica del juego actualmente',
    aiAnalysis: 'Master Yi es actualmente el jungler más dominante del meta. Su Q "Alpha Strike" permite reseteos rápidos tras eliminaciones, generando snowballs devastadoras en partidas de soloQ. Con un win rate del 55.2%, supera a todos los demás jungleres.\n\nBuild recomendado: Filo de la Noche into Eclipse maximiza su burst. La sinergia con Taric sigue siendo una de las composiciones más tóxicas del juego.\n\nConsejo principal: Prioriza farmeo temprano y busca invasiones en la jungla enemiga tras el level 3. Evita teamfights sin tu ultimate listo.',
    proPickRate: 5.2,
  },
  {
    name: 'Jinx', title: 'the Loose Cannon', role: 'ADC', tier: 'S', winRate: 54.1, pickRate: 12.3, banRate: 5.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Hypercarry', items: 'Filo Infinito → Huracán de Runaan → Bailarín Espectral → Sed de Sangre → El Final', winRate: 55.3 },
      { name: 'Build Early Power', items: 'Poder de Kraken Slayer → La Séptima → Infinito → Bailarín Espectral → Botas de Berserker', winRate: 53.1 },
    ],
    counterPick: 'Caitlyn, Varus, Kassadin (gap close)',
    synergy: 'Thresh, Lulu — Thresh para enganchar y lanzar, Lulu para protege',
    aiAnalysis: 'Jinx mantiene su dominio absoluto como ADC en el meta actual. Su pasiva "¡Prepárense!" le permite snowballar teamfights tras una sola eliminación. El buff reciente en su W aumentó su rango de seguridad, haciendo que su fase de lanes sea más fuerte.\n\nEl build de Kraken Slayer maximiza su daño sostenido en teamfights. La sinergia con Thresh es estadísticamente la mejor del parche con un 55%+ de win rate combinado.\n\nConsejo principal: Mantén posicionamiento agresivo en la fase de líneas para abusar de tu rango. En teamfights, busca la primera eliminación para activar tu pasiva y limpiar.',
    proPickRate: 22.1,
  },
  {
    name: 'Lee Sin', title: 'the Blind Monk', role: 'Jungle', tier: 'S', winRate: 52.8, pickRate: 10.5, banRate: 6.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Bruiser', items: 'Cosechador Nocturno → Eclipse → Hidra Titánica → Fuerza de la Trinidad → Botas de Mercurio', winRate: 52.5 },
      { name: 'Build Full CD', items: 'Conquistador → Eclipse → Hidra → Fuerza de la Trinidad → Botas de CD', winRate: 51.8 },
    ],
    counterPick: 'Nidalee, Elise, Kindred',
    synergy: 'Ahri, Orianna —良好 synergy con campeones de control',
    aiAnalysis: 'Lee Sin sigue siendo el jungler más popular en ranked alto y competitivo. Su presión temprana con Q + W es inigualable, permitiéndole controlar ambos lados del mapa desde minuto 3. Aunque su win rate de 52.8% parece modesto, su impacto en el juego es masivo.\n\nEl build de Eclipse maximiza su burst en ganks tempranos. La transición a bruiser con Hidra Titánica le permite escalar correctamente.\n\nConsejo principal: Practica las combo de insec (Q → R → Flash) para ser un factor diferenciante. Controla vision en la jungla enemiga constantemente.',
    proPickRate: 15.3,
  },
  {
    name: 'Thresh', title: 'the Chain Warden', role: 'Support', tier: 'S', winRate: 51.9, pickRate: 15.2, banRate: 1.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Engage', items: 'Redención → Convergencia de Zeke → Medallón de los Solari de Hierro → Mikael → Botas de Movilidad', winRate: 52.3 },
      { name: 'Build AP', items: 'Reloj de Arena de Zhonya → Morellonomicon → Redención → Centro de Gravedad → Botas de CD', winRate: 50.1 },
    ],
    counterPick: 'Morgana, Nautilus, Leona',
    synergy: 'Jinx, Vayne, Caitlyn — Cualquier ADC de hypercarry',
    aiAnalysis: 'Thresh es el soporte más versátil del meta. Su kit completo (enganche, escudo, lantern pull, peel con E) lo hace útil en cualquier composición. Con el pick rate más alto entre supports (15.2%), es el pick más seguro para la bot lane.\n\nLa sinergia Thresh + Jinx es la más fuerte del parche. El lantern permite repositioning instantáneo de Jinx para teamfights.\n\nConsejo principal: Usa tu E (Flail) para interrumpir engages enemigos. No tengas miedo de usar el lantern ofensivamente para lanzar a tu ADC hacia el enemigo.',
    proPickRate: 25.6,
  },
  {
    name: 'Darius', title: 'the Hand of Noxus', role: 'Top', tier: 'S', winRate: 53.5, pickRate: 7.8, banRate: 8.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Bruiser', items: 'Fuerza de Trinidad → Eclipse → Hidra Titánica → Mandato Imperial → Botas de Mercurio', winRate: 54.1 },
      { name: 'Build Anti-Tank', items: 'Pozo de la Noche → Filo Divino → Hidra → Mandato Imperial → Botas de Placas', winRate: 52.7 },
    ],
    counterPick: 'Teemo, Vayne, Gwen',
    synergy: 'Jarvan IV, Orianna — Comps con engage yfollow-up',
    aiAnalysis: 'Darius es el top laner más temido del meta. Su Q decimatadora con el heal reciente lo convierte en una máquina de trading en lane. Con un ban rate del 8.3%, es uno de los campeones más evitados en draft.\n\nEl meta actual de bruisers le favorece enormemente. La reducción de defensas mágicas en varios items significa que su Q y passive son más letales que nunca.\n\nConsejo principal: Abusa de tu passive de hemorragia para ganar trades extendidos. Busca anchor con tu E bajo torre para resultados garantizados.',
    proPickRate: 10.3,
  },
  {
    name: 'Ahri', title: 'the Nine-Tailed Fox', role: 'Mid', tier: 'S', winRate: 53.2, pickRate: 8.1, banRate: 2.8, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Oneshot', items: 'Sombrero de Rabadon → Reloj de Zhonya → Llamasomo → Morellonomicon → Botas del Vacío', winRate: 54.2 },
      { name: 'Build Utility', items: 'Cetro de Cristal de Rylai → Llamasomo → Morellonomicon → Redención → Botas de CD', winRate: 51.5 },
    ],
    counterPick: 'Galio, Kassadin, Fizz',
    synergy: 'Thresh, Lee Sin — Buen follow-up para engage',
    aiAnalysis: 'Ahri asciende a Tier S gracias a los buffs en su E (Charm). El aumento de rango base le permite atrapar objetivos desde posiciones más seguras. Con un win rate del 53.2%, es la mid laner más consistente del meta.\n\nSu movilidad con ultimate le da un roaming excelente, permitiéndole impactar todas las lanes. El build de Rabadon maximiza su burst para one-shot carries enemigos.\n\nConsejo principal: Usa tu E para castigar errores de posicionamiento. Tras level 6, roam constantemente con tu ultimate para generar ventajas en otras lanes.',
    proPickRate: 18.5,
  },
  {
    name: 'Yasuo', title: 'the Unforgiven', role: 'Mid', tier: 'S', winRate: 51.8, pickRate: 11.2, banRate: 4.7, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Crit', items: 'Filo de la Noche → Colmillo Infinito → Bailarín Espectral → Sed de Sangre → Botas de Berserker', winRate: 52.3 },
      { name: 'Build Lethality', items: 'Filo de la Noche → Eclipse → El Colector → Última Piedad → Botas de Movilidad', winRate: 50.8 },
    ],
    counterPick: 'Malzahar, Anivia, Lissandra',
    synergy: 'Taliyah, Yasuo + Taliyah wall combo; Gragas, engages con knock-up',
    aiAnalysis: 'Yasuo se mantiene en Tier S a pesar del nerf a su muro de viento (W). Su kit de reseteo con Q en tornado sigue siendo devastador en teamfights, especialmente con compositions que garantizan knock-ups.\n\nEl nerf al W (0.75s menos) lo hace más vulnerable contra habilidades de projectile, pero no afecta su capacidad de teamfight masiva con ultimate.\n\nConsejo principal: No fuerces plays agresivos sin tornado cargado. En la lane phase, usa E inteligentemente para farmar y esquivar habilidades al mismo tiempo.',
    proPickRate: 8.5,
  },
  {
    name: 'Caitlyn', title: 'the Sheriff of Piltover', role: 'ADC', tier: 'S', winRate: 52.5, pickRate: 9.6, banRate: 2.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Poke', items: 'Poder de Kraken Slayer → La Séptima → Filo Infinito → Huracán de Runaan → Botas de Berserker', winRate: 53.1 },
      { name: 'Build Lethality', items: 'Filo de la Noche → Eclipse → El Colector → Filo Infinito → Botas de Movilidad', winRate: 51.7 },
    ],
    counterPick: 'Samira, Draven, Sivir',
    synergy: 'Morgana, Lux — Poke lanes con root para trampas',
    aiAnalysis: 'Caitlyn domina el early game en la bot lane gracias a su rango superior. Su combo de trampa + headshot puede eliminar a ADCs frágiles en el level 2. El buff a Kraken Slayer mejoró significativamente su scaling.\n\nEs especialmente fuerte contraADCs sin gap closer como Jinx en la fase de líneas. Sus trampas de W proporcionan control de mapa invaluable.\n\nConsejo principal: Coloca trampas estratégicamente en los arbustos de la bot lane para controlar la zona. En teamfights, mantén la distancia máxima con tu rango de 650.',
    proPickRate: 20.5,
  },
  // Tier A — Fuertes
  { name: 'Orianna', title: 'the Lady of Clockwork', role: 'Mid', tier: 'A', winRate: 51.2, pickRate: 6.3, banRate: 0.8, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Control Mage', items: 'Sombrero de Rabadon → Reloj de Zhonya → Llamasomo → Morellonomicon → Botas del Vacío', winRate: 51.8 },
    ],
  },
  { name: 'Vi', title: 'the Piltover Enforcer', role: 'Jungle', tier: 'A', winRate: 50.8, pickRate: 5.2, banRate: 1.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Bruiser', items: 'Cosechador Nocturno → Eclipse → Hidra Titánica → Fuerza de la Trinidad → Botas de Mercurio', winRate: 50.5 },
    ],
  },
  { name: 'Ezreal', title: 'the Prodigal Explorer', role: 'ADC', tier: 'A', winRate: 49.5, pickRate: 8.9, banRate: 0.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Blue Build', items: 'Filo de la Noche → Muramana → Hielo Eterno → Colmillo Infinito → Botas de CD', winRate: 49.8 },
    ],
  },
  { name: 'Lulu', title: 'the Fae Sorceress', role: 'Support', tier: 'A', winRate: 50.1, pickRate: 7.4, banRate: 0.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Enchanter', items: 'Redención → Convergencia de Zeke → Mikael → Medallón → Botas de CD', winRate: 50.5 },
    ],
  },
  { name: 'Garen', title: 'The Might of Demacia', role: 'Top', tier: 'A', winRate: 51.5, pickRate: 6.7, banRate: 1.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Bruiser', items: 'Fuerza de Trinidad → Eclipse → Hidra Titánica → Resistencia Divina → Botas de Placas', winRate: 52.0 },
    ],
  },
  { name: 'Katarina', title: 'the Sinister Blade', role: 'Mid', tier: 'A', winRate: 50.3, pickRate: 7.1, banRate: 2.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Oneshot', items: 'Sombrero de Rabadon → Morellonomicon → Llamasomo → Reloj de Zhonya → Botas del Vacío', winRate: 50.8 },
    ],
  },
  { name: 'Graves', title: 'the Outlaw', role: 'Jungle', tier: 'A', winRate: 49.8, pickRate: 4.5, banRate: 0.6, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Vayne', title: 'the Night Hunter', role: 'ADC', tier: 'A', winRate: 50.6, pickRate: 5.8, banRate: 0.4, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build On-Hit', items: 'Guja Botadora → Frenesí de Runaan → Bailarín Espectral → Última Piedad → Botas de Berserker', winRate: 51.2 },
    ],
  },
  { name: 'Leona', title: 'the Radiant Dawn', role: 'Support', tier: 'A', winRate: 51.0, pickRate: 4.9, banRate: 0.7, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Renekton', title: 'the Butcher of the Sands', role: 'Top', tier: 'A', winRate: 50.4, pickRate: 5.6, banRate: 1.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Zed', title: 'the Master of Shadows', role: 'Mid', tier: 'A', winRate: 49.2, pickRate: 8.3, banRate: 3.8, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Amumu', title: 'the Sad Mummy', role: 'Jungle', tier: 'A', winRate: 51.3, pickRate: 6.1, banRate: 0.9, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Jhin', title: 'the Virtuoso', role: 'ADC', tier: 'A', winRate: 51.7, pickRate: 7.2, banRate: 1.0, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL',
    builds: [
      { name: 'Build Crit', items: 'Filo de la Noche → Colmillo Infinito → Huracán de Runaan → Llamasomo → Botas de Berserker', winRate: 52.0 },
    ],
  },
  { name: 'Morgana', title: 'the Fallen', role: 'Support', tier: 'A', winRate: 50.5, pickRate: 8.8, banRate: 1.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Camille', title: 'the Steel Shadow', role: 'Top', tier: 'A', winRate: 49.9, pickRate: 5.1, banRate: 2.0, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Diana', title: 'Scorn of the Moon', role: 'Jungle', tier: 'A', winRate: 50.2, pickRate: 4.8, banRate: 1.4, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Lux', title: 'the Lady of Luminosity', role: 'Mid', tier: 'A', winRate: 48.5, pickRate: 9.2, banRate: 0.6, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Nami', title: 'the Tidecaller', role: 'Support', tier: 'A', winRate: 49.1, pickRate: 5.3, banRate: 0.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Wukong', title: 'the Monkey King', role: 'Top', tier: 'A', winRate: 48.8, pickRate: 4.2, banRate: 0.8, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Volibear', title: 'the Relentless Storm', role: 'Top', tier: 'A', winRate: 47.9, pickRate: 3.8, banRate: 0.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Twisted Fate', title: 'the Card Master', role: 'Mid', tier: 'A', winRate: 48.2, pickRate: 4.5, banRate: 1.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Ashe', title: 'the Frost Archer', role: 'ADC', tier: 'A', winRate: 49.3, pickRate: 6.4, banRate: 0.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Rakan', title: 'the Charmer', role: 'Support', tier: 'A', winRate: 48.1, pickRate: 4.7, banRate: 0.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Xin Zhao', title: 'the Seneschal of Demacia', role: 'Jungle', tier: 'A', winRate: 48.7, pickRate: 3.9, banRate: 0.4, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Tristana', title: 'the Yordle Gunner', role: 'ADC', tier: 'A', winRate: 48.9, pickRate: 5.1, banRate: 0.5, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Shen', title: 'the Eye of Twilight', role: 'Top', tier: 'A', winRate: 47.5, pickRate: 3.2, banRate: 0.7, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Syndra', title: 'the Dark Sovereign', role: 'Mid', tier: 'A', winRate: 47.8, pickRate: 4.1, banRate: 0.9, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Yorick', title: 'Shepherd of Souls', role: 'Top', tier: 'A', winRate: 46.2, pickRate: 2.1, banRate: 0.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Ivern', title: 'the Green Father', role: 'Jungle', tier: 'A', winRate: 45.8, pickRate: 1.5, banRate: 0.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Nidalee', title: 'the Bestial Huntress', role: 'Jungle', tier: 'A', winRate: 46.5, pickRate: 2.3, banRate: 0.4, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Kalista', title: 'the Spear of Vengeance', role: 'ADC', tier: 'A', winRate: 45.5, pickRate: 1.8, banRate: 0.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Braum', title: 'the Heart of the Freljord', role: 'Support', tier: 'A', winRate: 46.8, pickRate: 2.5, banRate: 0.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: "Vel'Koz", title: 'the Eye of the Void', role: 'Mid', tier: 'A', winRate: 46.0, pickRate: 1.9, banRate: 0.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Mordekaiser', title: 'the Iron Revenant', role: 'Top', tier: 'A', winRate: 45.2, pickRate: 2.7, banRate: 0.6, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Taliyah', title: 'the Stoneweaver', role: 'Mid', tier: 'A', winRate: 46.3, pickRate: 2.0, banRate: 0.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Bard', title: 'the Wandering Caretaker', role: 'Support', tier: 'A', winRate: 43.5, pickRate: 1.2, banRate: 0.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Skarner', title: 'the Crystal Vanguard', role: 'Jungle', tier: 'A', winRate: 44.1, pickRate: 0.8, banRate: 0.1, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Azir', title: 'the Emperor of the Sands', role: 'Mid', tier: 'A', winRate: 43.8, pickRate: 1.0, banRate: 0.2, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
  { name: 'Urgot', title: 'the Dreadnought', role: 'Top', tier: 'A', winRate: 44.5, pickRate: 1.4, banRate: 0.3, image: '', aiInsight: '', build: '', runes: '', counters: '', synergies: '', patch: '14.8', game: 'LoL', builds: [] },
];

const PATCHES_DATA: Omit<PatchNote, 'id' | 'date'>[] = [
  {
    version: '14.8',
    title: 'Patch 14.8 — Ajustes de Mid Season',
    summary: 'Ajustes de champions para preparación de mid-season invicta.',
    digest: 'Esta patch trae cambios significativos al meta de mid-season. Se buffean campeones de jungla como Master Yi y Lee Sin, mientras se ajustan ADCs de alta movilidad. Jinx recibe un ligero nerf en su rango de W pero compensa con más daño en su pasiva. Thresh mantiene su dominio en la bot lane con pequeñas mejoras de calidad de vida.',
    sourceGame: 'LoL',
  },
];

const INSIGHTS_DATA: Omit<AiInsight, 'id' | 'date'>[] = [
  { champion: 'Master Yi', category: 'buff', content: 'Master Yi ha recibido un buff significativo en su Q que le permite resetear más rápido tras eliminaciones. Esto lo convierte en un jungler extremadamente peligroso en partidas de snowball.', confidence: 0.92 },
  { champion: 'Jinx', category: 'buff', content: 'Jinx mantiene su status de ADC dominante gracias a la sinergia con la nueva runa de cosecha. Su win rate subió un 2.3% esta patch.', confidence: 0.88 },
  { champion: 'Ahri', category: 'tier-change', content: 'Ahri asciende a Tier S tras los cambios en su E. Ahora charm tiene mayor rango base, permitiéndole atrapar objetivos desde posiciones más seguras.', confidence: 0.85 },
  { champion: 'Darius', category: 'meta', content: 'El meta actual de bruisers favorece a Darius enormemente. Con la reducción de defensas mágicas en varios items, su Q sigue siendo devastador en teamfights.', confidence: 0.90 },
  { champion: 'Lee Sin', category: 'counter', content: 'Lee Sin es un counter directo de Diana en la jungla. Su presión temprana supera a Diana, y puede invadir su jungle sin riesgo gracias a sus escapes.', confidence: 0.87 },
  { champion: 'Thresh', category: 'synergy', content: 'La sinergia Thresh + Jinx es una de las más fuertes del meta. Thresh puede enganchar y lanzar a Jinx para que active su pasiva de forma casi garantizada.', confidence: 0.93 },
  { champion: 'Yasuo', category: 'nerf', content: 'Yasuo recibió un nerf en su muro de viento (W), que ahora dura 0.75 segundos menos. Aún así, su kit de reseteo lo mantiene en Tier S.', confidence: 0.91 },
  { champion: 'Caitlyn', category: 'meta', content: 'Caitlyn domina el early game en la bot lane. Su combo de trampa + headshot puede eliminar a ADCs frágiles en el level 2, especialmente contra Jhin.', confidence: 0.86 },
  { champion: 'Katarina', category: 'buff', content: 'Katarina gana velocidad de movimiento al usar dagas, lo que mejora su supervivencia en teamfights. Este cambio la posiciona como pick sólido en mid.', confidence: 0.82 },
  { champion: 'Master Yi', category: 'meta', content: 'El combo Master Yi + Taric sigue siendo uno de los más tóxicos para jugar en contra. La incapacidad del rival de interactuar durante la invulnerabilidad de Taric es frustrante.', confidence: 0.94 },
  { champion: 'Morgana', category: 'counter', content: 'Morgana counters efectivamente a Leona. Su escudo negro (E) anula el enganche de Leona, neutralizando su principal herramienta de iniciación.', confidence: 0.89 },
  { champion: 'Zed', category: 'nerf', content: 'Zed recibe reducción de daño en sus sombras (W). El daño de las sombras now escala con un 15% menos de AD bonus.', confidence: 0.88 },
  { champion: 'Orianna', category: 'tier-change', content: 'Orianna se mantiene en Tier A pero podría ascender pronto. Su ultimate en teamfights sigue siendo uno de los mejores engages del juego.', confidence: 0.80 },
  { champion: 'Garen', category: 'buff', content: 'Garen recibe reducción de cooldown en su E, lo que le permite girar más seguido. Esto mejora su clear de jungle en el meta de bruiser jungler.', confidence: 0.83 },
  { champion: 'Vayne', category: 'counter', content: 'Vayne es el counter perfecto para tanks como Ornn y Malphite. Su porcentaje de daño verdadero con W se vuelve más relevante en teamfights largos.', confidence: 0.85 },
  { champion: 'Jinx', category: 'synergy', content: 'Jinx + Thresh es la sinergia ADC-Support más fuerte del parche actual. El porcentaje de victoria combinado supera el 55%.', confidence: 0.95 },
  { champion: 'Amumu', category: 'tier-change', content: 'Amumu sube a Tier A gracias a los cambios en items de control. Su engage con R es devastador con el nuevo build de cooldown reduction.', confidence: 0.81 },
  { champion: 'Darius', category: 'counter', content: 'Darius counterpick a Renekton en top lane. Su pasiva de hemorragia supera la sustain de Renekton en trades extendidos.', confidence: 0.84 },
  { champion: 'Lulu', category: 'synergy', content: 'Lulu + Jhin forman una potente sinergia de poke y protección. La W de Lulu permite a Jhin posicionarse mejor para sus trampas.', confidence: 0.79 },
  { champion: 'Camille', category: 'nerf', content: 'Camille pierde velocidad de movimiento en su Q2. Esto reduce significativamente su capacidad de chase en el late game.', confidence: 0.86 },
  { champion: 'Master Yi', category: 'tier-change', content: 'Master Yi asciende a Tier S por primera vez en varias patches. Su win rate del 55.2% lo convierte en el jungler más consistente.', confidence: 0.96 },
];

const TASKS_DATA: Omit<TaskItem, 'id'>[] = [
  { title: 'Verificar nuevas patches', description: 'Revisar servidores Riot cada 30 min para detectar nuevas patches disponibles.', status: 'done', pointer: 0, interval: 30 },
  { title: 'Actualizar tier list', description: 'Recalcular tiers basado en win rate, pick rate y ban rate actualizados.', status: 'running', pointer: 1, interval: 60 },
  { title: 'Generar insights de IA', description: 'Analizar cambios de patch y generar insights automáticos con IA.', status: 'pending', pointer: 2, interval: 45 },
  { title: 'Detectar cosas rotas', description: 'Identificar campeones con win rate anormalmente alto o bajo.', status: 'pending', pointer: 3, interval: 30 },
  { title: 'Actualizar badges de frescura', description: 'Marcar datos que tengan más de 24h como potentially stale.', status: 'done', pointer: 4, interval: 120 },
  { title: 'Analizar sinergias de meta', description: 'Detectar combinaciones OP de champions basadas en datos reales.', status: 'pending', pointer: 5, interval: 90 },
  { title: 'Actualizar counters', description: 'Recalcular matchups basados en datos de partidas recientes.', status: 'running', pointer: 6, interval: 60 },
  { title: 'Sincronizar datos de Wild Rift', description: 'Importar datos de champions de Wild Rift si hay cambios.', status: 'pending', pointer: 7, interval: 180 },
  { title: 'Generar resumen semanal', description: 'Crear un resumen semanal de cambios en el meta para el dashboard.', status: 'pending', pointer: 8, interval: 1440 },
  { title: 'Verificar builds recomendados', description: 'Validar que los builds recomendados sigan siendo óptimos.', status: 'done', pointer: 9, interval: 120 },
  { title: 'Monitorear tier changes', description: 'Detectar cambios drásticos en tiers de champions overnight.', status: 'running', pointer: 10, interval: 30 },
  { title: 'Actualizar runas sugeridas', description: 'Sincronizar runas óptimas basadas en el meta actual.', status: 'pending', pointer: 11, interval: 240 },
  { title: 'Procesar feedback de usuarios', description: 'Analizar reportes de usuarios sobre datos incorrectos.', status: 'pending', pointer: 12, interval: 60 },
  { title: 'Backup de base de datos', description: 'Realizar backup automático de la base de datos.', status: 'done', pointer: 13, interval: 360 },
];

const PRO_PICKS_DATA: ProPick[] = [
  { champion: 'Ahri', role: 'Mid', tournament: 'LCK', region: 'KR', pickRate: 18.5, banRate: 12.3, winRate: 56.2, patch: '14.8' },
  { champion: 'Jinx', role: 'ADC', tournament: 'LCK', region: 'KR', pickRate: 22.1, banRate: 8.5, winRate: 54.8, patch: '14.8' },
  { champion: 'Lee Sin', role: 'Jungle', tournament: 'LPL', region: 'CN', pickRate: 15.3, banRate: 18.2, winRate: 51.1, patch: '14.8' },
  { champion: 'Thresh', role: 'Support', tournament: 'LCK', region: 'KR', pickRate: 25.6, banRate: 3.1, winRate: 53.5, patch: '14.8' },
  { champion: 'Azir', role: 'Mid', tournament: 'LCK', region: 'KR', pickRate: 14.2, banRate: 22.5, winRate: 57.3, patch: '14.8' },
  { champion: 'Rakan', role: 'Support', tournament: 'LEC', region: 'EU', pickRate: 18.3, banRate: 5.2, winRate: 52.8, patch: '14.8' },
  { champion: 'Jhin', role: 'ADC', tournament: 'LEC', region: 'EU', pickRate: 16.8, banRate: 6.1, winRate: 51.9, patch: '14.8' },
  { champion: 'Camille', role: 'Top', tournament: 'LCK', region: 'KR', pickRate: 13.5, banRate: 20.1, winRate: 48.7, patch: '14.8' },
  { champion: 'Xin Zhao', role: 'Jungle', tournament: 'LCS', region: 'NA', pickRate: 11.2, banRate: 4.5, winRate: 49.3, patch: '14.8' },
  { champion: 'Orianna', role: 'Mid', tournament: 'LPL', region: 'CN', pickRate: 19.8, banRate: 15.3, winRate: 55.1, patch: '14.8' },
  { champion: 'Vayne', role: 'ADC', tournament: 'LCK', region: 'KR', pickRate: 8.5, banRate: 3.2, winRate: 58.9, patch: '14.8' },
  { champion: 'Maokai', role: 'Support', tournament: 'LCS', region: 'NA', pickRate: 14.1, banRate: 2.8, winRate: 53.2, patch: '14.8' },
  { champion: 'Darius', role: 'Top', tournament: 'LPL', region: 'CN', pickRate: 10.3, banRate: 12.8, winRate: 52.5, patch: '14.8' },
  { champion: 'Master Yi', role: 'Jungle', tournament: 'LCS', region: 'NA', pickRate: 5.2, banRate: 8.1, winRate: 45.3, patch: '14.8' },
  { champion: 'Caitlyn', role: 'ADC', tournament: 'LPL', region: 'CN', pickRate: 20.5, banRate: 9.3, winRate: 54.6, patch: '14.8' },
  { champion: 'Gwen', role: 'Top', tournament: 'LEC', region: 'EU', pickRate: 12.7, banRate: 16.5, winRate: 50.8, patch: '14.8' },
];

// Add IDs
const championsWithIds: Champion[] = CHAMPIONS_DATA.map((c, i) => ({
  ...c,
  id: i + 1,
  createdAt: '2026-04-18T00:00:00.000Z',
  updatedAt: '2026-04-18T00:00:00.000Z',
}));

const patchesWithIds: PatchNote[] = PATCHES_DATA.map((p, i) => ({
  ...p,
  id: i + 1,
  date: '2026-04-15T00:00:00.000Z',
}));

const insightsWithIds: AiInsight[] = INSIGHTS_DATA.map((ins, i) => ({
  ...ins,
  id: i + 1,
  date: '2026-04-18T00:00:00.000Z',
}));

const tasksWithIds: TaskItem[] = TASKS_DATA.map((t, i) => ({
  ...t,
  id: i + 1,
}));

const proPicksWithIds: ProPick[] = PRO_PICKS_DATA.map((p, i) => ({
  ...p,
  id: i + 1,
}));

// ============================================================
// PUBLIC API — always returns data (embedded fallback)
// ============================================================

export function getChampions(filters?: { role?: string; tier?: string; game?: string; search?: string }): Champion[] {
  let data = championsWithIds;
  if (filters?.role && filters.role !== 'All') data = data.filter(c => c.role === filters.role);
  if (filters?.tier) data = data.filter(c => c.tier === filters.tier);
  if (filters?.game) data = data.filter(c => c.game === filters.game);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    data = data.filter(c => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
  }
  return data.sort((a, b) => {
    const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    if (tierOrder[a.tier] !== tierOrder[b.tier]) return tierOrder[a.tier] - tierOrder[b.tier];
    return b.winRate - a.winRate;
  });
}

export function getPatches(game?: string): PatchNote[] {
  let data = patchesWithIds;
  if (game) data = data.filter(p => p.sourceGame === game);
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getInsights(champion?: string, category?: string): AiInsight[] {
  let data = insightsWithIds;
  if (champion) data = data.filter(i => i.champion === champion);
  if (category) data = data.filter(i => i.category === category);
  return data.sort((a, b) => b.confidence - a.confidence);
}

export function getTasks(): TaskItem[] {
  return tasksWithIds.sort((a, b) => a.id - b.id);
}

export function updateTaskStatus(id: number, status: string): TaskItem | null {
  const task = tasksWithIds.find(t => t.id === id);
  if (task) {
    task.status = status;
    return task;
  }
  return null;
}

export function getProPicks(region?: string): ProPick[] {
  let data = proPicksWithIds;
  if (region) data = data.filter(p => p.region === region);
  return data.sort((a, b) => b.pickRate - a.pickRate);
}
