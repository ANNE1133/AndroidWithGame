/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(
    email: string,
    pass: string,
    fullName: string,
    age: number,
  ): Promise<any> {
    const user = await this.userService.create({
      email,
      password: pass,
      fullName: fullName,
      age: age,
      provider: AuthProvider.LOCAL,
    });
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async googleLogin(user) {
    let existingUser = await this.userService.findOneByEmail(user.email);

    if (!existingUser) {
      existingUser = await this.userService.create({
        email: user.email,
        fullName: user.fullName,
        provider: AuthProvider.GOOGLE,
      });
    }

    const payload = { sub: existingUser.id, username: existingUser.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
