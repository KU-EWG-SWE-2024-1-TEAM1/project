import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './Decorator';
import { Role } from './Role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    console.log('Request context in RolesGuard:', request); // 디버깅 로그 추가
    console.log('User in RolesGuard:', user); // 디버깅 로그 추가
    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }
    if (!requiredRoles.some((role) => user.role === role)) {
      throw new ForbiddenException('Not allowed to access the resource.');
    }
    return true;
  }
}