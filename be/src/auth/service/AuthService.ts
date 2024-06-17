import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../modules/user/service/UserService";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dto/LoginDto";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if(!user) throw new NotFoundException('User with email not found')

    if (user && await bcrypt.compare(password, user.password))  return user;
    else throw new UnauthorizedException('Incorrect Password');
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}