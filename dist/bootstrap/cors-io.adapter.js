"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class CorsIoAdapter extends platform_socket_io_1.IoAdapter {
    allowedOrigins;
    constructor(app, allowedOrigins) {
        super(app);
        this.allowedOrigins = allowedOrigins;
    }
    createIOServer(port, options) {
        return super.createIOServer(port, {
            ...options,
            cors: {
                origin: this.allowedOrigins,
                credentials: true,
            },
        });
    }
}
exports.CorsIoAdapter = CorsIoAdapter;
//# sourceMappingURL=cors-io.adapter.js.map