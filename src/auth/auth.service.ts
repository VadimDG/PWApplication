import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  public async validateUser(useremail: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(useremail);
    if (user && user.Password === pass) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.Email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
