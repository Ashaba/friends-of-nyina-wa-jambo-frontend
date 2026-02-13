export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export type StrapiResult<T> = StrapiResponse<T> | StrapiError;

export interface MessageOfTheDay {
  id: number;
  documentId: string;
  title: string;
  message: string;
  author?: string;
  displayDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
