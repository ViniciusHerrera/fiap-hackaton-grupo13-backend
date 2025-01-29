export class ApiResponse<T> {
  data: T;
  error: { code: number; message: string } | null;

  total_pages?: number;
  limit?: number;
  page?: number;

  constructor(
    data: T,
    error: { code: number; message: string } | null = null,
    pagination?: { totalPages: number; limit: number; page: number },
  ) {
    this.data = data;
    this.error = error;

    if (pagination) {
      this.total_pages = pagination.totalPages;
      this.limit = pagination.limit;
      this.page = pagination.page;
    }
  }
}
