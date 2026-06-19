"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudinaryUrl = parseCloudinaryUrl;
exports.resolveCloudinaryCredentials = resolveCloudinaryCredentials;
exports.resolveAssetFolder = resolveAssetFolder;
exports.signCloudinaryParams = signCloudinaryParams;
exports.extractPublicId = extractPublicId;
const crypto_1 = require("crypto");
function parseCloudinaryUrl(url) {
    const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(url);
    if (!match) {
        throw new Error('Invalid CLOUDINARY_URL. Expected cloudinary://api_key:api_secret@cloud_name');
    }
    return {
        apiKey: decodeURIComponent(match[1]),
        apiSecret: decodeURIComponent(match[2]),
        cloudName: match[3],
    };
}
function resolveCloudinaryCredentials(input) {
    if (input.cloudinaryUrl) {
        return parseCloudinaryUrl(input.cloudinaryUrl);
    }
    if (input.cloudName && input.apiKey && input.apiSecret) {
        return {
            cloudName: input.cloudName,
            apiKey: input.apiKey,
            apiSecret: input.apiSecret,
        };
    }
    throw new Error('Cloudinary credentials missing. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
}
function resolveAssetFolder(rootFolder, subfolder) {
    if (!subfolder || subfolder === rootFolder) {
        return rootFolder;
    }
    if (subfolder.startsWith(`${rootFolder}/`)) {
        return subfolder;
    }
    return `${rootFolder}/${subfolder}`;
}
function signCloudinaryParams(params, apiSecret) {
    const payload = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    return (0, crypto_1.createHash)('sha1')
        .update(payload + apiSecret)
        .digest('hex');
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