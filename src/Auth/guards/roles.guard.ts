import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiresRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])

    const request = context.switchToHttp().getRequest()

    const user = request.user;

    console.log(requiresRoles);

    const hasRole = () => requiresRoles.some((role) => user?.roles?.includes(role))
    const valid = user && user.roles && hasRole();

    console.log(user.roles)

    if(!valid) throw new ForbiddenException("You are not allowed to access this information");

    return valid;
  }
}
