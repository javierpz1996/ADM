export interface Player {
  id: string;
  name: string;
  role: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  region: string;
  players: Player[];
  wins: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
  isLive: boolean;
  scoreA?: number;
  scoreB?: number;
}

export interface BracketMatch {
  id: string;
  round: number;
  position: number;
  teamA: Team | null;
  teamB: Team | null;
  winner: Team | null;
  scoreA?: number;
  scoreB?: number;
}

export interface MVPPlayer {
  id: string;
  nickname: string;
  teamName: string;
  teamLogo: string;
  teamLogoImage?: string;
  role: string;
  avatar: string;
  kda: string;
  image?: string;
}

export interface GroupTeam {
  id: string;
  name: string;
  logo: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  points: number;
  change: "up" | "down" | "same";
  changeAmount?: number;
}

/** Jugador de un equipo TI16 (código país ISO 3166-1 alpha-2 para bandera) */
export interface TI16TeamPlayer {
  id: string;
  name: string;
  role: string;
  countryCode: string;
}

export interface TI16Team {
  id: string;
  name: string;
  logo: string;
  /** Ruta de imagen del logo del equipo (ej. /images/team-1.png) */
  logoImage?: string;
  /** Si no hay jugadores o está vacío, la card muestra TBD */
  players?: TI16TeamPlayer[];
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const merchItems: MerchItem[] = [
  {
    id: "merch1",
    name: "Championship 2026 Jersey",
    price: 79.99,
    image: "jersey",
    category: "Apparel",
  },
  {
    id: "merch2",
    name: "Team Spirit Hoodie",
    price: 89.99,
    image: "hoodie",
    category: "Apparel",
  },
  {
    id: "merch3",
    name: "Tournament T-Shirt",
    price: 34.99,
    image: "tshirt",
    category: "Apparel",
  },
  {
    id: "merch4",
    name: "Pro Gaming Mousepad XL",
    price: 29.99,
    image: "mousepad",
    category: "Accessories",
  },
  {
    id: "merch5",
    name: "Championship Cap",
    price: 24.99,
    image: "cap",
    category: "Apparel",
  },
  {
    id: "merch6",
    name: "Collector's Edition Pin Set",
    price: 19.99,
    image: "pins",
    category: "Collectibles",
  },
];

export const ti16Teams: TI16Team[] = [
  {
    id: "t1",
    name: "Team Liquid",
    logo: "TL",
    logoImage: "/images/team-1.png",
    players: [
      { id: "tl1", name: "miCKe", role: "1", countryCode: "SE" },
      { id: "tl2", name: "Nisha", role: "2", countryCode: "PL" },
      { id: "tl3", name: "zai", role: "3", countryCode: "SE" },
      { id: "tl4", name: "Boxi", role: "4", countryCode: "SE" },
      { id: "tl5", name: "Insania", role: "5", countryCode: "SE" },
    ],
  },
  { id: "t2", name: "PARIVISION", logo: "PV" },
  {
    id: "t3",
    name: "BetBoom",
    logo: "BB",
    logoImage: "/images/team-2.png",
    players: [
      { id: "bb1", name: "Nightfall", role: "1", countryCode: "RU" },
      { id: "bb2", name: "gpk", role: "2", countryCode: "RU" },
      { id: "bb3", name: "Save-", role: "3", countryCode: "RU" },
      { id: "bb4", name: "TORONTOTOKYO", role: "4", countryCode: "RU" },
      { id: "bb5", name: "Solo", role: "5", countryCode: "RU" },
    ],
  },
  { id: "t4", name: "All Gamers", logo: "AG" },
  { id: "t5", name: "Gladiators", logo: "GG" },
  {
    id: "t6",
    name: "Team Spirit",
    logo: "TS",
    logoImage: "/images/team-3.png",
    players: [
      { id: "ts1", name: "Yatoro", role: "1", countryCode: "UA" },
      { id: "ts2", name: "Larl", role: "2", countryCode: "RU" },
      { id: "ts3", name: "Collapse", role: "3", countryCode: "RU" },
      { id: "ts4", name: "Mira", role: "4", countryCode: "UA" },
      { id: "ts5", name: "Miposhka", role: "5", countryCode: "RU" },
    ],
  },
  { id: "t7", name: "Team Falcons", logo: "TF" },
  { id: "t8", name: "Tundra Esports", logo: "TE" },
  { id: "t9", name: "Aurora", logo: "AU" },
  { id: "t10", name: "HEROIC", logo: "HE" },
  { id: "t11", name: "Xtreme Gaming", logo: "XG" },
  { id: "t12", name: "Wildcard", logo: "WC" },
];

export const teams: Team[] = [
  {
    id: "1",
    name: "Team Spirit",
    logo: "TS",
    region: "CIS",
    players: [
      { id: "1", name: "Yatoro", role: "Carry" },
      { id: "2", name: "TORONTOTOKYO", role: "Mid" },
      { id: "3", name: "Collapse", role: "Offlane" },
      { id: "4", name: "Mira", role: "Support" },
      { id: "5", name: "Miposhka", role: "Hard Support" },
    ],
    wins: 8,
    losses: 2,
    points: 24,
  },
  {
    id: "2",
    name: "OG Esports",
    logo: "OG",
    region: "EU",
    players: [
      { id: "6", name: "Bzm", role: "Carry" },
      { id: "7", name: "Yuragi", role: "Mid" },
      { id: "8", name: "Ammar", role: "Offlane" },
      { id: "9", name: "Taiga", role: "Support" },
      { id: "10", name: "Ceb", role: "Hard Support" },
    ],
    wins: 7,
    losses: 3,
    points: 21,
  },
  {
    id: "3",
    name: "Gaimin Gladiators",
    logo: "GG",
    region: "EU",
    players: [
      { id: "11", name: "Dyrachyo", role: "Carry" },
      { id: "12", name: "Quinn", role: "Mid" },
      { id: "13", name: "Ace", role: "Offlane" },
      { id: "14", name: "tOfu", role: "Support" },
      { id: "15", name: "Seleri", role: "Hard Support" },
    ],
    wins: 6,
    losses: 3,
    points: 18,
  },
  {
    id: "4",
    name: "Tundra Esports",
    logo: "TU",
    region: "EU",
    players: [
      { id: "16", name: "Skiter", role: "Carry" },
      { id: "17", name: "Nine", role: "Mid" },
      { id: "18", name: "33", role: "Offlane" },
      { id: "19", name: "Saksa", role: "Support" },
      { id: "20", name: "Sneyking", role: "Hard Support" },
    ],
    wins: 6,
    losses: 4,
    points: 18,
  },
  {
    id: "5",
    name: "Evil Geniuses",
    logo: "EG",
    region: "NA",
    players: [
      { id: "21", name: "Arteezy", role: "Carry" },
      { id: "22", name: "Abed", role: "Mid" },
      { id: "23", name: "Nightfall", role: "Offlane" },
      { id: "24", name: "Cr1t-", role: "Support" },
      { id: "25", name: "Fly", role: "Hard Support" },
    ],
    wins: 5,
    losses: 4,
    points: 15,
  },
  {
    id: "6",
    name: "PSG.LGD",
    logo: "LGD",
    region: "CN",
    players: [
      { id: "26", name: "shiro", role: "Carry" },
      { id: "27", name: "NothingToSay", role: "Mid" },
      { id: "28", name: "Faith_bian", role: "Offlane" },
      { id: "29", name: "XinQ", role: "Support" },
      { id: "30", name: "y`", role: "Hard Support" },
    ],
    wins: 5,
    losses: 5,
    points: 15,
  },
  {
    id: "7",
    name: "Team Liquid",
    logo: "TL",
    region: "EU",
    players: [
      { id: "31", name: "miCKe", role: "Carry" },
      { id: "32", name: "Nisha", role: "Mid" },
      { id: "33", name: "zai", role: "Offlane" },
      { id: "34", name: "Boxi", role: "Support" },
      { id: "35", name: "iNSaNiA", role: "Hard Support" },
    ],
    wins: 4,
    losses: 5,
    points: 12,
  },
  {
    id: "8",
    name: "BetBoom Team",
    logo: "BB",
    region: "CIS",
    players: [
      { id: "36", name: "Daxak", role: "Carry" },
      { id: "37", name: "Larl", role: "Mid" },
      { id: "38", name: "Pure", role: "Offlane" },
      { id: "39", name: "RodjER", role: "Support" },
      { id: "40", name: "SoNNeikO", role: "Hard Support" },
    ],
    wins: 3,
    losses: 6,
    points: 9,
  },
];

export const upcomingMatches: Match[] = [
  {
    id: "m1",
    teamA: teams[0],
    teamB: teams[1],
    date: "March 15, 2026",
    time: "14:00 UTC",
    isLive: true,
    scoreA: 1,
    scoreB: 1,
  },
  {
    id: "m2",
    teamA: teams[2],
    teamB: teams[3],
    date: "March 15, 2026",
    time: "17:00 UTC",
    isLive: false,
  },
  {
    id: "m3",
    teamA: teams[4],
    teamB: teams[5],
    date: "March 16, 2026",
    time: "14:00 UTC",
    isLive: false,
  },
  {
    id: "m4",
    teamA: teams[6],
    teamB: teams[7],
    date: "March 16, 2026",
    time: "17:00 UTC",
    isLive: false,
  },
];

export const mvpPlayers: MVPPlayer[] = [
  {
    id: "mvp1",
    nickname: "Yatoro",
    teamName: "Team Spirit",
    teamLogo: "TS",
    teamLogoImage: "/images/team-1.png",
    role: "Carry",
    avatar: "Y",
    kda: "12.4/2.1/8.3",
    image: "/images/players/player-1.png",
  },
  {
    id: "mvp2",
    nickname: "Collapse",
    teamName: "Team Spirit",
    teamLogo: "TS",
    role: "Offlane",
    avatar: "C",
    kda: "8.7/3.2/14.5",
  },
  {
    id: "mvp3",
    nickname: "Quinn",
    teamName: "Gaimin Gladiators",
    teamLogo: "GG",
    role: "Mid",
    avatar: "Q",
    kda: "10.2/2.8/11.1",
  },
  {
    id: "mvp4",
    nickname: "Yuragi",
    teamName: "OG Esports",
    teamLogo: "OG",
    role: "Mid",
    avatar: "YU",
    kda: "11.8/3.4/7.9",
  },
  {
    id: "mvp5",
    nickname: "NothingToSay",
    teamName: "PSG.LGD",
    teamLogo: "LGD",
    role: "Mid",
    avatar: "N",
    kda: "9.5/2.9/10.7",
  },
  {
    id: "mvp6",
    nickname: "Arteezy",
    teamName: "Evil Geniuses",
    teamLogo: "EG",
    role: "Carry",
    avatar: "R",
    kda: "10.1/3.1/9.2",
  },
  {
    id: "mvp7",
    nickname: "Nisha",
    teamName: "Team Liquid",
    teamLogo: "TL",
    role: "Mid",
    avatar: "NI",
    kda: "9.8/2.7/8.4",
  },
];

export const groupATeams: GroupTeam[] = [
  { id: "ga1", name: "Team Secret", logo: "SEC", gamesPlayed: 8, wins: 8, losses: 0, points: 8, change: "same" },
  { id: "ga2", name: "PSG.LGD", logo: "LGD", gamesPlayed: 10, wins: 8, losses: 2, points: 8, change: "same" },
  { id: "ga3", name: "Mineski", logo: "MSK", gamesPlayed: 8, wins: 5, losses: 3, points: 5, change: "up", changeAmount: 1 },
  { id: "ga4", name: "TNC Predator", logo: "TNC", gamesPlayed: 10, wins: 5, losses: 5, points: 5, change: "down", changeAmount: 1 },
  { id: "ga5", name: "Alliance", logo: "ALL", gamesPlayed: 8, wins: 4, losses: 4, points: 4, change: "up", changeAmount: 3 },
  { id: "ga6", name: "Newbee", logo: "NB", gamesPlayed: 8, wins: 4, losses: 4, points: 4, change: "down", changeAmount: 1 },
  { id: "ga7", name: "Team Liquid", logo: "TL", gamesPlayed: 10, wins: 3, losses: 7, points: 3, change: "down", changeAmount: 1 },
  { id: "ga8", name: "Keen Gaming", logo: "KG", gamesPlayed: 10, wins: 2, losses: 8, points: 2, change: "down", changeAmount: 2 },
  { id: "ga9", name: "Thunder Predator", logo: "TP", gamesPlayed: 9, wins: 1, losses: 8, points: 1, change: "same" },
];

export const groupBTeams: GroupTeam[] = [
  { id: "gb1", name: "OG", logo: "OG", gamesPlayed: 10, wins: 9, losses: 1, points: 9, change: "up", changeAmount: 1 },
  { id: "gb2", name: "Natus Vincere", logo: "NAVI", gamesPlayed: 10, wins: 7, losses: 3, points: 7, change: "up", changeAmount: 2 },
  { id: "gb3", name: "Vici Gaming", logo: "VG", gamesPlayed: 10, wins: 7, losses: 3, points: 7, change: "down", changeAmount: 1 },
  { id: "gb4", name: "Evil Geniuses", logo: "EG", gamesPlayed: 10, wins: 5, losses: 5, points: 5, change: "up", changeAmount: 2 },
  { id: "gb5", name: "Infamous", logo: "INF", gamesPlayed: 8, wins: 4, losses: 4, points: 4, change: "up", changeAmount: 3 },
  { id: "gb6", name: "Fnatic", logo: "FNC", gamesPlayed: 8, wins: 3, losses: 5, points: 3, change: "down", changeAmount: 2 },
  { id: "gb7", name: "Virtus.pro", logo: "VP", gamesPlayed: 8, wins: 3, losses: 5, points: 3, change: "down", changeAmount: 4 },
  { id: "gb8", name: "RNG", logo: "RNG", gamesPlayed: 8, wins: 1, losses: 7, points: 1, change: "down", changeAmount: 1 },
  { id: "gb9", name: "Quincy Crew", logo: "QC", gamesPlayed: 8, wins: 0, losses: 8, points: 0, change: "down", changeAmount: 1 },
];

export const bracketMatches: BracketMatch[] = [
  // Quarter Finals (Round 1)
  { id: "qf1", round: 1, position: 1, teamA: teams[0], teamB: teams[7], winner: teams[0], scoreA: 2, scoreB: 0 },
  { id: "qf2", round: 1, position: 2, teamA: teams[3], teamB: teams[4], winner: teams[3], scoreA: 2, scoreB: 1 },
  { id: "qf3", round: 1, position: 3, teamA: teams[2], teamB: teams[5], winner: teams[2], scoreA: 2, scoreB: 1 },
  { id: "qf4", round: 1, position: 4, teamA: teams[1], teamB: teams[6], winner: teams[1], scoreA: 2, scoreB: 0 },
  // Semi Finals (Round 2)
  { id: "sf1", round: 2, position: 1, teamA: teams[0], teamB: teams[3], winner: teams[0], scoreA: 2, scoreB: 1 },
  { id: "sf2", round: 2, position: 2, teamA: teams[2], teamB: teams[1], winner: teams[1], scoreA: 1, scoreB: 2 },
  // Finals (Round 3)
  { id: "f1", round: 3, position: 1, teamA: teams[0], teamB: teams[1], winner: null },
];
