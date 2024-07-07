import { CustomException, CustomExceptionCode } from '../exception-handler';
import { IHttpResponse } from '../interfaces';

export class FailHttpResponseDto implements IHttpResponse<null> {
  statusCode: number;
  data: null;
  errorCode: CustomExceptionCode;
  message: string;
  constructor({
    statusCode,
    error,
  }: {
    statusCode: number;
    error: CustomException;
  }) {
    this.statusCode = statusCode;
    this.data = null;
    this.message = error.message;
    this.errorCode = error.errorCode;
  }
}
