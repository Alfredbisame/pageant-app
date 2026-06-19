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
    apiKey: decodeURIComponent(match[1]),
    apiSecret: decodeURIComponent(match[2]),
    cloudName: match[3],
  };
}

export function resolveCloudinaryCredentials(input: {
  cloudinaryUrl?: string;
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
}): CloudinaryCredentials {
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

  throw new Error(
    'Cloudinary credentials missing. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
  );
}

export function resolveAssetFolder(
  rootFolder: string,
  subfolder?: string,
): string {
  if (!subfolder || subfolder === rootFolder) {
    return rootFolder;
  }

  if (subfolder.startsWith(`${rootFolder}/`)) {
    return subfolder;
  }

  return `${rootFolder}/${subfolder}`;
}

export type CloudinaryFolderMode = 'dynamic' | 'fixed';

export function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1')
    .update(payload + apiSecret)
    .digest('hex');
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
