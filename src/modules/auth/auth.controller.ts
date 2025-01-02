import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { AuthEntity } from './entities/auth.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  signIn(@Body() signInDto: SignInDto): Promise<AuthEntity> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
