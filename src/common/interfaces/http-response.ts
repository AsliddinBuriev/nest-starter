import { CustomExceptionCode } from '../exception-handler';
import { IPagination } from './pagination';

export interface IHttpResponse<T> {
  statusCode: number;
  message: string;
  data: T | IPagination<T> | null;
  errorCode: CustomExceptionCode | null;
}
