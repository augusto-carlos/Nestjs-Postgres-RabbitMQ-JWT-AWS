import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models';

function getCurrentUserByContext(
  _data: unknown,
  context: ExecutionContext,
): UserDocument {
  const user: UserDocument = context.switchToHttp().getRequest().user;
  return user;
}

export const CurrentUser = createParamDecorator(getCurrentUserByContext);
