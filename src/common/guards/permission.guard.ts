import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Permission } from "../permission.enum";
import { PERMISSION_KEY } from "../decorators/permission.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.getAllAndOverride<Permission[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permission) {
      return true
    }
    const { user } = context.switchToHttp().getRequest();
    return user.permissions?.includes(permission) 
  }
}