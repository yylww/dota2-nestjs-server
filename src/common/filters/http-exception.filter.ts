import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = (exception.getResponse() as any).message || 'error';

    response.status(status).json({
      statusCode: status,
      success: false,
      message,
      path: request.url,
      method: request.method,
    });
  }
}
