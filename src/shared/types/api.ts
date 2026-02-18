export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ApiQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    filters?: Record<string, any>;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
}

export interface IBaseApi<T> {
    getAll(params?: ApiQueryParams): Promise<PaginatedResponse<T>>;
    getById(id: string): Promise<T>;
    create(data: Omit<T, 'id'>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}
