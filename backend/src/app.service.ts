import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Smart ERP System API',
      version: '0.1.0',
      description: 'Modern ERP system with modular architecture',
      status: 'running',
    };
  }
}