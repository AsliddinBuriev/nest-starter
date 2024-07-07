import { exceptionBody } from './custom-exception-body';
import { CustomExceptionCode } from './custom-exception-code';

export class CustomException extends Error {
  errorCode: CustomExceptionCode;
  statusCode: number;
  constructor(exceptionCode: CustomExceptionCode, message?: string) {
    super(message || exceptionBody[exceptionCode].message);
    this.errorCode = exceptionCode;
    this.statusCode = exceptionBody[exceptionCode].statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
