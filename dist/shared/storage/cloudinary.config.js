"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudinaryUrl = parseCloudinaryUrl;
exports.signCloudinaryParams = signCloudinaryParams;
exports.extractPublicId = extractPublicId;
const crypto_1 = require("crypto");
function parseCloudinaryUrl(url) {
    const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(url);
    if (!match) {
        throw new Error('Invalid CLOUDINARY_URL. Expected cloudinary://api_key:api_secret@cloud_name');
    }
    return {
        apiKey: match[1],
        apiSecret: match[2],
        cloudName: match[3],
    };
}
function signCloudinaryParams(params, apiSecret) {
    const payload = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    return (0, crypto_1.createHash)('sha1').update(payload + apiSecret).digest('hex');
}
function extractPublicId(publicIdOrUrl) {
    if (!publicIdOrUrl.includes('cloudinary.com')) {
        return publicIdOrUrl;
    }
    const uploadSegment = '/upload/';
    const uploadIndex = publicIdOrUrl.indexOf(uploadSegment);
    if (uploadIndex === -1) {
        return publicIdOrUrl;
    }
    let path = publicIdOrUrl.slice(uploadIndex + uploadSegment.length);
    path = path.replace(/^v\d+\//, '');
    return path.replace(/\.[^/.]+$/, '');
}
//# sourceMappingURL=cloudinary.config.js.map