import { createHash } from 'crypto';

export interface CloudinaryCredentials {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export function parseCloudinaryUrl(url: string): CloudinaryCredentials {
  const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(url);
  if (!match) {
    throw new Error(
      'Invalid CLOUDINARY_URL. Expected cloudinary://api_key:api_secret@cloud_name',
    );
  }

  return {
    apiKey: match[1],
    apiSecret: match[2],
    cloudName: match[3],
  };
}

export function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1').update(payload + apiSecret).digest('hex');
}

export function extractPublicId(publicIdOrUrl: string): string {
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
