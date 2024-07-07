import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomException } from './custom-exception';
import { CustomExceptionCode } from './custom-exception-code';
import { FailHttpResponseDto } from '../dto';
import { Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    this.logger.error(JSON.stringify(exception));
    const customException: CustomException = this.getError(exception);
    const errorResponse = new FailHttpResponseDto({
      error: customException,
      statusCode: customException.statusCode,
    });

    httpAdapter.reply(
      ctx.getResponse(),
      errorResponse,
      customException.statusCode,
    );
  }
  private getError(exception: any): CustomException {
    this.logger.error(exception);
    if (exception instanceof CustomException) return exception;
    if (!exception?.status)
      return new CustomException(CustomExceptionCode.INTERNAL_SERVER_ERROR);
    const message = exception?.response?.message;
    const statusCode = exception?.status;
    switch (statusCode) {
      case 400:
        return new CustomException(CustomExceptionCode.BAD_REQUEST, message);
      case 404:
        return new CustomException(CustomExceptionCode.NOT_FOUND, message);
      default:
        return new CustomException(CustomExceptionCode.INTERNAL_SERVER_ERROR);
    }
  }
}
