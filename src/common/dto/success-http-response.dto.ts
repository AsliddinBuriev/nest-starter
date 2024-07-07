import { IHttpResponse } from '../interfaces';

export class SuccessHttpResponseDto<T> implements IHttpResponse<T> {
  statusCode: number;
  data: T;
  errorCode: null;
  message: string;
  constructor({
    statusCode,
    data,
    message,
  }: {
    statusCode: number;
    data: T;
    message?: string;
  }) {
    this.statusCode = statusCode;
    this.data = data;
    this.errorCode = null;
    this.message = message || 'Success';
  }
}
