export class ApiResponse<T> {
  data: T;
  error: { code: number; message: string } | null;

  total_pages?: number;
  per_page?: number;
  page?: number;

  constructor(
    data: T,
    error: { code: number; message: string } | null = null,
    pagination?: { totalPages: number; perPage: number; page: number },
  ) {
    this.data = data;
    this.error = error;

    if (pagination) {
      this.total_pages = pagination.totalPages;
      this.per_page = pagination.perPage;
      this.page = pagination.page;
    }
  }
}
