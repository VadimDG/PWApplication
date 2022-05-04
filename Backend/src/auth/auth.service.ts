import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDbWrapperService } from 'src/user-db-wrapper/users-db-wrapper.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersDbWrapperService, private jwtService: JwtService) { }

  public async validateUser(email: string, password: string): Promise<any> {
    
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password: Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
