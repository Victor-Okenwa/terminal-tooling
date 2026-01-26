export function isUrl(text: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    return urlRegex.test(text);
}

export function sanitizeSelection(text: string): string {
    return text.trim().replace(/\s+/g, ' '); // Remove extra whitespace
}