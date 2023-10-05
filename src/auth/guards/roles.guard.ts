import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../common/decorator/role.decorator';
import { RolePriority } from '../../common/decorator/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector : Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleEndpoint = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roleEndpoint) return false;
    const roleParam = context.switchToHttp().getRequest().user.role;

    const [a, b] = [RolePriority[roleEndpoint], RolePriority[roleParam]];
    return a <= b? true : false;
  }
}
