export function sanitizeSelection(text: string): string {
    return text.trim().replace(/\s+/g, ' '); // Remove extra whitespace
}