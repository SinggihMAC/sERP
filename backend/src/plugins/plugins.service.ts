import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PluginsService {
  private readonly logger = new Logger(PluginsService.name);
  private plugins: Map<string, any> = new Map();

  constructor(private eventEmitter: EventEmitter2) {}

  /**
   * Register a plugin
   * @param name Plugin name
   * @param plugin Plugin instance
   */
  registerPlugin(name: string, plugin: any): void {
    if (this.plugins.has(name)) {
      this.logger.warn(`Plugin ${name} is already registered. Overwriting...`);
    }
    this.plugins.set(name, plugin);
    this.logger.log(`Plugin ${name} registered successfully`);
  }

  /**
   * Get a plugin by name
   * @param name Plugin name
   * @returns Plugin instance
   */
  getPlugin(name: string): any {
    if (!this.plugins.has(name)) {
      this.logger.warn(`Plugin ${name} not found`);
      return null;
    }
    return this.plugins.get(name);
  }

  /**
   * Get all registered plugins
   * @returns Map of plugins
   */
  getAllPlugins(): Map<string, any> {
    return this.plugins;
  }

  /**
   * Unregister a plugin
   * @param name Plugin name
   * @returns boolean indicating success
   */
  unregisterPlugin(name: string): boolean {
    if (!this.plugins.has(name)) {
      this.logger.warn(`Plugin ${name} not found`);
      return false;
    }
    this.plugins.delete(name);
    this.logger.log(`Plugin ${name} unregistered successfully`);
    return true;
  }

  /**
   * Emit a post-transaction event
   * @param eventName Event name
   * @param payload Event payload
   */
  emitPostTransactionEvent(eventName: string, payload: any): void {
    this.logger.log(`Emitting post-transaction event: ${eventName}`);
    this.eventEmitter.emit(`post-transaction.${eventName}`, payload);
  }
}