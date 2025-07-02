import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PluginsModule } from './plugins/plugins.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION', '15m'),
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    
    // Event Emitter for post-transaction hooks
    EventEmitterModule.forRoot(),
    
    // Database
    PrismaModule,
    
    // Core Modules
    AuthModule,
    UsersModule,
    RolesModule,
    
    // Plugins Module
    PluginsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global JWT Guard - all routes require authentication by default
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}