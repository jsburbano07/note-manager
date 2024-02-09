import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  getUserId(token: string) {
    const decodedToken = this.jwtService.verify(token);
    if(!decodedToken) throw new Error('Token is invalid')
    const {_id} = decodedToken
    return _id
  }

  async validateTokenAndFindUser(token: string): Promise<boolean> {
    try {
      const decodedToken = this.jwtService.verify(token);
      if(!decodedToken) throw new Error('Token is invalid')
      const {_id} = decodedToken
      const user = await this.userRepository.findById(_id)
      return !!user
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, username, _id } = user;
      return {username, _id} as User;
    }

    return null;
  }

  async registerUser(username: string, password: string): Promise<{ token: string, username: string }> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser(username, hashedPassword);
    const payload = { username: newUser.username, _id: newUser._id };
    const token = this.jwtService.sign(payload);
    return {token, username: newUser.username};
  }

  async login(loginDto: LoginDto): Promise<{ token: string, username: string }> {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, _id: user._id };
    const token = this.jwtService.sign(payload);

    return { token, username: user.username };
  }
}
