/**
 * Parses a comma-separated list of allowed client origins.
 * Example: "https://app.example.com,https://admin.example.com"
 */
export function parseAllowedOrigins(value: string): string[] {
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}
