import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/models/user.schema';

function getCurrentUserByContext(_data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();

  return request.user;
}

export const CurrentUser = createParamDecorator(getCurrentUserByContext);
