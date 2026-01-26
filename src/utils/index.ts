// src/utils/index.ts

/**
 * Validates if a string is a URL
 */
export function isUrl(text: string): boolean {
    const trimmed = text.trim();

    // Check for common URL patterns
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    const localhostPattern = /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i;

    return urlPattern.test(trimmed) || localhostPattern.test(trimmed);
}

/**
 * Normalizes a URL by adding protocol if missing
 */
export function normalizeUrl(text: string): string {
    const trimmed = text.trim();

    if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
    }

    return trimmed;
}

/**
 * Sanitizes a command by removing extra whitespace and newlines
 */
export function sanitizeCommand(text: string): string {
    return text
        .trim()
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/\n+/g, ' '); // Replace newlines with spaces
}