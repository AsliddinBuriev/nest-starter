import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessHttpResponseDto } from '../dto';

@Injectable()
export class ResponseFormatter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse()
          .statusCode as number;
        if (statusCode !== 302 && statusCode !== 301) {
          return new SuccessHttpResponseDto({
            statusCode: statusCode,
            message: 'Success',
            data: data,
          });
        }
      }),
    );
  }
}
