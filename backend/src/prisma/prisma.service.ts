import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    
    // Only for development and testing
    const models = Reflect.ownKeys(this).filter((key) => {
      return typeof key === 'string' && !key.startsWith('_') && !['$connect', '$disconnect', '$on', '$transaction', '$use'].includes(key as string);
    });

    return Promise.all(
      models.map((modelKey) => {
        return this[modelKey as string].deleteMany();
      }),
    );
  }
}