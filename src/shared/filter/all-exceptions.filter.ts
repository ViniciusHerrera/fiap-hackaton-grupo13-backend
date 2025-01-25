import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (
      typeof message === 'object' &&
      message !== null &&
      'data' in message &&
      'error' in message &&
      message.error &&
      typeof message.error === 'object' &&
      'code' in message.error &&
      'message' in message.error
    ) {
      response.status(status).json(message);
      return;
    }

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
