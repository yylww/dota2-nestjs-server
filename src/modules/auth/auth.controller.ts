import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/common/permission.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  // @RequirePermission(Permission.Update)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user
  }
}
