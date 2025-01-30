import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
        const isPaginated =
          data?.totalPages !== undefined && data?.limit && data?.page;

        if (isPaginated) {
          return new ApiResponse(data.items, null, {
            totalPages: data.totalPages,
            limit: data.limit,
            page: data.page,
          });
        }

        return new ApiResponse(data);
      }),
      catchError((error) => {
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (error instanceof HttpException) {
          statusCode = error.getStatus();
          const errorResponse = error.getResponse();

          if (typeof errorResponse === 'object' && errorResponse !== null) {
            message = (errorResponse as any).message || error.message;
          } else {
            message = errorResponse as string;
          }
        }

        return throwError(
          () =>
            new HttpException(
              new ApiResponse<null>(null, { code: statusCode, message }),
              statusCode,
            ),
        );
      }),
    );
  }
}
