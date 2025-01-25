import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dtos/api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const isPaginated = data?.totalPages && data?.perPage && data?.page;

        if (isPaginated) {
          return new ApiResponse(data.items, null, {
            totalPages: data.totalPages,
            perPage: data.perPage,
            page: data.page,
          });
        }

        return new ApiResponse(data);
      }),
    );
  }
}
