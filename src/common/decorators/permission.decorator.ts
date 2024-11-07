import { SetMetadata } from "@nestjs/common";
import { Permission } from "../enums/permission.enum";

export const PERMISSION_KEY = 'permissions';
export const RequirePermission = (permission: Permission) => SetMetadata(PERMISSION_KEY, permission);