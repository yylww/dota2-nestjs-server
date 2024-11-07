import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthEntity> {
    const user = await this.usersService.findOne(email);
    const isPasswordValid = await bcrypt.compare(pass, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = {
      userId: user.id,
      username: user.name,
    };
    return {
      username: user.name,
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
