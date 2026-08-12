export const SITE = {
  name: 'Edmonton Data Society',
  shortName: 'EDS',
  tagline: 'Connect & Learn',
  description:
    'A community of data science professionals, academics, and students in Edmonton, Alberta who meet regularly to share work, network, and learn from each other.',
  location: 'Edmonton, Alberta',
  email: 'edmontondatasociety@gmail.com',
} as const;

export const LINKS = {
  discord: 'https://discord.gg/jSZPjemzuq',
  linkedin: 'https://www.linkedin.com/company/edmonton-data-science-community/',
  github: 'https://github.com/Edmonton-Data-Science-Community',
  luma: 'https://lu.ma/calendar/cal-0bDgxCEdnFr1W8O',
} as const;

/** Luma calendar id, used for the embedded upcoming-events widget. */
export const LUMA_CALENDAR_ID = 'cal-0bDgxCEdnFr1W8O';

export const NAV = [
  { label: 'Events', href: '/events/' },
  { label: 'About', href: '/about/' },
] as const;
