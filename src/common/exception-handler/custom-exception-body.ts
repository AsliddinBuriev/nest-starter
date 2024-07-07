import { HttpStatus } from '@nestjs/common';
import { CustomExceptionCode } from './custom-exception-code';

export const exceptionBody = {
  [CustomExceptionCode.BAD_REQUEST]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Bad Request || Invalid Parameters',
  },
  [CustomExceptionCode.UNAUTHORIZED]: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  [CustomExceptionCode.FORBIDDEN]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Forbidden',
  },
  [CustomExceptionCode.NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Not Found',
  },
  [CustomExceptionCode.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  },
};
