import { ApiQueryParams, PaginatedResponse, IBaseApi } from '../types/api';

const MIN_DELAY = 300;
const MAX_DELAY = 800;

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => {
    const ms = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
    return delay(ms);
};

export class MockApi<T extends { id: string }> implements IBaseApi<T> {
    protected data: T[];

    constructor(initialData: T[]) {
        this.data = [...initialData];
    }

    async getAll(params: ApiQueryParams = {}): Promise<PaginatedResponse<T>> {
        await randomDelay();

        let filteredData = [...this.data];

        // 1. Filtering
        if (params.search) {
            const searchLower = params.search.toLowerCase();
            filteredData = filteredData.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(searchLower)
                )
            );
        }

        if (params.filters) {
            Object.entries(params.filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    if (key === 'dateFrom') {
                        const fromDate = new Date(value as string);
                        filteredData = filteredData.filter(item => {
                            // @ts-ignore
                            const itemDate = new Date(item.date);
                            return itemDate >= fromDate;
                        });
                    } else if (key === 'dateTo') {
                        const toDate = new Date(value as string);
                        toDate.setHours(23, 59, 59, 999);
                        filteredData = filteredData.filter(item => {
                            // @ts-ignore
                            const itemDate = new Date(item.date);
                            return itemDate <= toDate;
                        });
                    } else {
                        filteredData = filteredData.filter((item) => {
                            // @ts-ignore
                            const itemValue = String(item[key]).toLowerCase();
                            const filterValue = String(value).toLowerCase();

                            // Partial match for text fields
                            const PARTIAL_MATCH_KEYS = ['name', 'email', 'phone', 'inn', 'externalid', 'client', 'manager', 'scenario', 'title', 'username'];

                            if (PARTIAL_MATCH_KEYS.includes(key.toLowerCase())) {
                                return itemValue.includes(filterValue);
                            }

                            // Exact match for everything else (status, role, id, etc.)
                            return itemValue === filterValue;
                        });
                    }
                }
            });
        }

        // 2. Sorting
        if (params.sort) {
            const { field, order } = params.sort;
            filteredData.sort((a, b) => {
                // @ts-ignore
                const valA = a[field];
                // @ts-ignore
                const valB = b[field];

                if (valA < valB) return order === 'asc' ? -1 : 1;
                if (valA > valB) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // 3. Pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = filteredData.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            total: filteredData.length,
            page,
            limit,
        };
    }

    async getById(id: string): Promise<T> {
        await randomDelay();
        const item = this.data.find((d) => d.id === id);
        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }

    async create(data: Omit<T, 'id'>): Promise<T> {
        await randomDelay();
        const newItem = { ...data, id: crypto.randomUUID() } as T;
        this.data.unshift(newItem); // Add to beginning
        return newItem;
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        await randomDelay();
        const index = this.data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.data[index] = { ...this.data[index], ...data };
        return this.data[index];
    }

    async delete(id: string): Promise<void> {
        await randomDelay();
        const index = this.data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.data.splice(index, 1);
    }
}
