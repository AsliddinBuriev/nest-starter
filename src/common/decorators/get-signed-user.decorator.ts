import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomException, CustomExceptionCode } from '../exception-handler';
import { IRequestWithUser } from '../interfaces';

export const SignedUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    if (!request?.user)
      throw new CustomException(
        CustomExceptionCode.INTERNAL_SERVER_ERROR,
        'Error in SignedUser decorator, user not found in request',
      );
    const user = { ...request.user };
    delete request.user;
    return user;
  },
);
