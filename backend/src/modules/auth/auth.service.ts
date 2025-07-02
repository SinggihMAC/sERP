import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validate user credentials
   * @param email User email
   * @param password User password
   * @returns User without password if valid
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Generate JWT tokens for authenticated user
   * @param user User object
   * @returns Access and refresh tokens
   */
  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.roleId };
    
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);
    
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    };
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns New user and tokens
   */
  async register(userData: any) {
    const user = await this.usersService.create(userData);
    return this.login(user);
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken Refresh token
   * @returns New access token
   */
  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      
      // Check if user exists
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      
      // Generate new access token
      const accessToken = await this.generateAccessToken({
        sub: user.id,
        email: user.email,
        role: user.roleId,
      });
      
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Generate access token
   * @param payload Token payload
   * @returns Access token
   */
  private async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION', '15m'),
    });
  }

  /**
   * Generate refresh token
   * @param payload Token payload
   * @returns Refresh token
   */
  private async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
    });
  }
}