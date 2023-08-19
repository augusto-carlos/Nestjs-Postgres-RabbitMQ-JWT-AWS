import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

function getCurrentUserByContext(_data: unknown, context: ExecutionContext) {
  const user: UserDocument = context.switchToHttp().getRequest().user;
  return user;
}

export const CurrentUser = createParamDecorator(getCurrentUserByContext);
