"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAllowedOrigins = parseAllowedOrigins;
function parseAllowedOrigins(value) {
    return value
        .split(',')
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0);
}
//# sourceMappingURL=cors.config.js.map