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
