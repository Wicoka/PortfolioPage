export type Language = 'en' | 'de' | 'hu';

export interface LanguageOption {
  code: Language;
  flag: string;
  // Native name, used as the button's accessible label.
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'hu', flag: '🇭🇺', label: 'Magyar' },
];

// Used when the device language is not one of the supported ones.
export const FALLBACK_LANGUAGE: Language = 'en';

// Every language must describe every project, so a missing translation is a compile error.
export type ProjectId = 1 | 2 | 3;

export interface ProjectCopy {
  title: string;
  category: string;
  subtitle: string;
  // Second paragraph on the card: a sentence or two on how it works.
  description: string;
  outcome: string;
}

interface CardCopy {
  title: string;
  description: string;
}

export interface PageCopy {
  documentTitle: string;
  name: string;
  nav: { work: string; about: string; contact: string };
  resume: string;
  menuLabel: string;
  languageLabel: string;
  hero: {
    title: string;
    highlight: string;
    lead: (years: number) => string;
    sayHi: string;
    downloadCv: string;
  };
  stats: {
    label: string;
    years: string;
    angular: string;
    remoteValue: string;
    remote: string;
  };
  work: { eyebrow: string; heading: string; technologiesLabel: string };
  about: {
    eyebrow: string;
    statement: string;
    statementTail: string;
    services: CardCopy[];
    toolboxLabel: string;
    toolbox: string[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    optional: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    invalid: string;
    success: string;
    error: string;
  };
  backToTop: string;
  projects: Record<ProjectId, ProjectCopy>;
}

const en: PageCopy = {
  documentTitle: 'Viktor Szőke | Angular Frontend Engineer',
  name: 'Viktor Szőke',
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  resume: 'Résumé',
  menuLabel: 'Toggle menu',
  languageLabel: 'Language',
  hero: {
    title: 'I make complicated software',
    highlight: 'feel simple.',
    lead: (years) =>
      `${years} years of frontend, mostly Angular. I also lead and mentor developers.`,
    sayHi: 'Say hi',
    downloadCv: 'Download CV',
  },
  stats: {
    label: 'Quick facts',
    years: 'years in frontend',
    angular: 'what I use most',
    remoteValue: 'Remote',
    remote: 'or hybrid, both work',
  },
  work: {
    eyebrow: 'Work',
    heading: "A few things I've built.",
    technologiesLabel: 'Technologies',
  },
  about: {
    eyebrow: 'About',
    statement:
      "I care about the small stuff. Loading states, empty screens, the button that's two pixels off.",
    statementTail: "That's usually where an app starts to feel good.",
    services: [
      { title: 'Frontend', description: 'Angular apps that stay fast and easy to change.' },
      { title: 'Team lead', description: 'Clear priorities, honest code reviews, no drama.' },
      { title: 'Mentoring', description: 'Helping juniors get good faster.' },
      { title: 'AI features', description: 'Only where they actually help the user.' },
    ],
    toolboxLabel: 'Toolbox',
    toolbox: [
      'Angular',
      'TypeScript',
      'Component systems',
      'Responsive UI',
      'Accessibility',
      'Performance',
      'Interaction design',
    ],
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Got a project or a role?',
    lead: "Tell me a bit about it and I'll get back to you.",
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    optional: 'optional',
    message: 'Message',
    messagePlaceholder: 'What are you working on?',
    send: 'Send',
    sending: 'Sending…',
    invalid: 'I need your name, a valid email and a short message.',
    success: "Got it, thanks. I'll get back to you soon.",
    error: "That didn't go through. Mind trying again in a bit?",
  },
  backToTop: 'Back to top',
  projects: {
    1: {
      title: 'Crypto Trading Backtester',
      category: 'Fintech',
      subtitle: 'Set up a trading bot, run it on past data, see if it would have made money.',
      description:
        "You change a parameter, run it again and compare. I worked on keeping that loop quick, because nobody tries ten ideas if each one takes ages.",
      outcome: 'Testing a strategy got a lot faster.',
    },
    2: {
      title: 'Agricultural Monitoring',
      category: 'Agritech',
      subtitle: 'Register devices out in the field and watch their data come in live.',
      description:
        'Every device shows its status and latest readings at a glance, so problems stand out instead of hiding in a table.',
      outcome: 'The daily check-in fits on one screen.',
    },
    3: {
      title: 'CNC Machine Interface',
      category: 'Industrial',
      subtitle: 'A cleaner UI for CNC machines, made for the people standing next to them.',
      description:
        "Big, clear controls and only the information the current step needs. Nobody standing next to a running machine should have to dig through menus.",
      outcome: 'Operators get through jobs faster.',
    },
  },
};

const de: PageCopy = {
  documentTitle: 'Viktor Szőke | Angular Frontend Engineer',
  name: 'Viktor Szőke',
  nav: { work: 'Projekte', about: 'Über mich', contact: 'Kontakt' },
  resume: 'Lebenslauf',
  menuLabel: 'Menü ein- oder ausblenden',
  languageLabel: 'Sprache',
  hero: {
    title: 'Komplizierte Software,',
    highlight: 'einfach gemacht.',
    lead: (years) =>
      `${years} Jahre Frontend, meistens Angular. Außerdem leite ich Entwickler an und begleite sie als Mentor.`,
    sayHi: 'Schreib mir',
    downloadCv: 'Lebenslauf herunterladen',
  },
  stats: {
    label: 'Kurz und knapp',
    years: 'Jahre im Frontend',
    angular: 'mein Hauptwerkzeug',
    remoteValue: 'Remote',
    remote: 'oder hybrid, beides passt',
  },
  work: {
    eyebrow: 'Projekte',
    heading: 'Ein paar Sachen, die ich gebaut habe.',
    technologiesLabel: 'Technologien',
  },
  about: {
    eyebrow: 'Über mich',
    statement:
      'Mir sind die Kleinigkeiten wichtig. Ladezustände, leere Seiten, der Button, der zwei Pixel daneben liegt.',
    statementTail: 'Meistens fängt genau da eine App an, sich gut anzufühlen.',
    services: [
      {
        title: 'Frontend',
        description: 'Angular-Apps, die schnell bleiben und sich leicht ändern lassen.',
      },
      { title: 'Teamleitung', description: 'Klare Prioritäten, ehrliche Code-Reviews, kein Drama.' },
      { title: 'Mentoring', description: 'Ich helfe Juniors, schneller richtig gut zu werden.' },
      { title: 'KI-Features', description: 'Nur da, wo sie dem Nutzer wirklich helfen.' },
    ],
    toolboxLabel: 'Werkzeuge',
    toolbox: [
      'Angular',
      'TypeScript',
      'Komponentensysteme',
      'Responsive UI',
      'Barrierefreiheit',
      'Performance',
      'Interaktionsdesign',
    ],
  },
  contact: {
    eyebrow: 'Kontakt',
    heading: 'Du hast ein Projekt oder eine Stelle?',
    lead: 'Erzähl mir kurz davon, ich melde mich bei dir.',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    subject: 'Betreff',
    optional: 'optional',
    message: 'Nachricht',
    messagePlaceholder: 'Woran arbeitest du gerade?',
    send: 'Senden',
    sending: 'Wird gesendet…',
    invalid: 'Ich brauche deinen Namen, eine gültige E-Mail und eine kurze Nachricht.',
    success: 'Angekommen, danke! Ich melde mich bald.',
    error: 'Das hat leider nicht geklappt. Versuch es bitte gleich noch einmal.',
  },
  backToTop: 'Nach oben',
  projects: {
    1: {
      title: 'Krypto-Trading-Backtester',
      category: 'Fintech',
      subtitle:
        'Trading-Bot einrichten, mit historischen Daten laufen lassen und sehen, ob er Geld verdient hätte.',
      description:
        'Parameter ändern, neu starten, vergleichen. Ich habe darauf geachtet, dass diese Schleife schnell bleibt, denn niemand testet zehn Ideen, wenn jede ewig dauert.',
      outcome: 'Strategien zu testen geht jetzt viel schneller.',
    },
    2: {
      title: 'Landwirtschafts-Monitoring',
      category: 'Agritech',
      subtitle: 'Geräte auf dem Feld registrieren und ihre Daten live verfolgen.',
      description:
        'Jedes Gerät zeigt auf einen Blick seinen Status und die letzten Messwerte. So fallen Probleme sofort auf, statt in einer Tabelle unterzugehen.',
      outcome: 'Der tägliche Check passt auf einen Bildschirm.',
    },
    3: {
      title: 'CNC-Maschinen-Interface',
      category: 'Industrie',
      subtitle:
        'Eine aufgeräumte Oberfläche für CNC-Maschinen, gemacht für die Leute, die daneben stehen.',
      description:
        'Große, klare Bedienelemente und nur die Infos, die der aktuelle Schritt braucht. Wer an einer laufenden Maschine steht, soll nicht durch Menüs suchen müssen.',
      outcome: 'Bediener sind schneller mit ihren Aufträgen fertig.',
    },
  },
};

const hu: PageCopy = {
  documentTitle: 'Szőke Viktor | Angular frontend fejlesztő',
  name: 'Szőke Viktor',
  nav: { work: 'Munkák', about: 'Rólam', contact: 'Kapcsolat' },
  resume: 'Önéletrajz',
  menuLabel: 'Menü megnyitása vagy bezárása',
  languageLabel: 'Nyelv',
  hero: {
    title: 'A bonyolult szoftvert',
    highlight: 'egyszerűvé teszem.',
    lead: (years) =>
      `${years} év frontend, főleg Angular. Emellett fejlesztőket vezetek és mentorálok.`,
    sayHi: 'Írj nekem',
    downloadCv: 'Önéletrajz letöltése',
  },
  stats: {
    label: 'Röviden',
    years: 'év frontend tapasztalat',
    angular: 'ezzel dolgozom a legtöbbet',
    remoteValue: 'Remote',
    remote: 'vagy hibrid, mindkettő jó',
  },
  work: {
    eyebrow: 'Munkák',
    heading: 'Pár dolog, amit építettem.',
    technologiesLabel: 'Technológiák',
  },
  about: {
    eyebrow: 'Rólam',
    statement:
      'Fontosak nekem az apróságok. A töltőképernyők, az üres oldalak, a gomb, ami két pixellel arrébb van.',
    statementTail: 'Többnyire ezeken múlik, hogy egy appot jó-e használni.',
    services: [
      {
        title: 'Frontend',
        description: 'Angular appok, amik gyorsak maradnak, és könnyű őket módosítani.',
      },
      { title: 'Csapatvezetés', description: 'Tiszta prioritások, őszinte code review, dráma nélkül.' },
      { title: 'Mentorálás', description: 'Segítek a junioroknak gyorsabban fejlődni.' },
      { title: 'AI funkciók', description: 'Csak ott, ahol tényleg segítenek a felhasználónak.' },
    ],
    toolboxLabel: 'Eszköztár',
    toolbox: [
      'Angular',
      'TypeScript',
      'Komponensrendszerek',
      'Reszponzív UI',
      'Akadálymentesség',
      'Teljesítmény',
      'Interakciótervezés',
    ],
  },
  contact: {
    eyebrow: 'Kapcsolat',
    heading: 'Projekted vagy nyitott pozíciód van?',
    lead: 'Írj róla pár sort, és jelentkezem.',
    name: 'Név',
    email: 'E-mail',
    phone: 'Telefon',
    subject: 'Tárgy',
    optional: 'nem kötelező',
    message: 'Üzenet',
    messagePlaceholder: 'Min dolgozol most?',
    send: 'Küldés',
    sending: 'Küldés…',
    invalid: 'Kell a neved, egy érvényes e-mail cím és egy rövid üzenet.',
    success: 'Megkaptam, köszönöm! Hamarosan jelentkezem.',
    error: 'Ez most nem ment át. Megpróbálnád kicsit később újra?',
  },
  backToTop: 'Vissza a tetejére',
  projects: {
    1: {
      title: 'Kripto kereskedési backtester',
      category: 'Fintech',
      subtitle:
        'Beállítasz egy kereskedő robotot, lefuttatod múltbeli adatokon, és kiderül, hozott volna-e pénzt.',
      description:
        'Átírsz egy paramétert, újrafuttatod, összehasonlítod. Arra figyeltem, hogy ez a kör gyors maradjon, mert senki nem próbál ki tíz ötletet, ha mindegyikre sokáig kell várni.',
      outcome: 'Egy stratégia tesztelése sokkal gyorsabb lett.',
    },
    2: {
      title: 'Mezőgazdasági monitoring',
      category: 'Agrártech',
      subtitle: 'Terepi eszközök regisztrálása és az adataik követése élőben.',
      description:
        'Minden eszköznél egy pillantással látszik az állapota és a legutóbbi mérése. Így a problémák rögtön feltűnnek, nem vesznek el egy táblázatban.',
      outcome: 'A napi ellenőrzés elfér egy képernyőn.',
    },
    3: {
      title: 'CNC gép kezelőfelület',
      category: 'Ipar',
      subtitle: 'Letisztultabb felület CNC gépekhez, azoknak, akik ott állnak mellettük.',
      description:
        'Nagy, egyértelmű kezelőelemek, és csak annyi információ, amennyi az aktuális lépéshez kell. Aki egy működő gép mellett áll, ne menükben keresgéljen.',
      outcome: 'A gépkezelők gyorsabban végeznek a munkákkal.',
    },
  },
};

export const TRANSLATIONS: Record<Language, PageCopy> = { en, de, hu };

export const isLanguage = (value: unknown): value is Language =>
  LANGUAGES.some((option) => option.code === value);
