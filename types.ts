
export interface CallRecord {
  id: string;
  duration: string;
  client: string;
  manager: string;
  scenario: string;
  status: 'transcription_error' | 'completed' | 'pending';
  score: number | null;
  date: string;
}

export interface Manager {
  id: string;
  name: string;
  role: string;
  callsCount: number;
  avgScore: number | null;
  avatarLetter: string;
}

export interface Client {
  id: string;
  name: string;
  externalId: string;
  inn: string;
  funnel: 'warm' | 'cold';
  callsCount: number;
  avgScore: number | null;
  createdAt: string;
  avatarLetter: string;
}

export interface Scenario {
  id: string;
  name: string;
  internalName: string;
  status: 'active' | 'inactive';
  description: string;
  usages: number;
  avgScore: number;
  categories: string[];
  prompt: string;
  updatedAt: string;
}

export interface AppUser {
  id: string;
  username: string;
  role: 'Админ' | 'Пользователь';
  active: boolean;
}

export interface RecentCallAdmin {
  id: string;
  client: string;
  status: string;
  date: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}