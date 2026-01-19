// Text utilities - Locale-safe string operations

/**
 * Converts text to uppercase using English locale.
 * This prevents Turkish "İ" character issues when device is set to Turkish locale.
 * CSS textTransform: 'uppercase' uses device locale which can cause issues.
 */
export function toUpperCase(text: string): string {
  return text.toLocaleUpperCase('en-US')
}

/**
 * Converts text to lowercase using English locale.
 * This prevents Turkish locale issues with lowercase "ı" character.
 */
export function toLowerCase(text: string): string {
  return text.toLocaleLowerCase('en-US')
}
