import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
export declare class CorsIoAdapter extends IoAdapter {
    private readonly allowedOrigins;
    constructor(app: INestApplication, allowedOrigins: string[]);
    createIOServer(port: number, options?: ServerOptions): Server;
}
