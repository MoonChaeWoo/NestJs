import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { User } from 'src/auth/db/user.entity';

export const AuthGetUser = createParamDecorator((data, ctx : ExecutionContext) : User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});