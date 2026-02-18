export interface Manager {
    id: string;
    name: string;
    role: string;
    callsCount: number;
    avgScore: number | null;
    avatarLetter: string;
}
