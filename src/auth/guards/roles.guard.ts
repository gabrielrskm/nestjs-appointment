import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector : Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) return true;
    const user  = context.switchToHttp().getRequest().user;
    return user.role === role;
    return true;
  }
}
