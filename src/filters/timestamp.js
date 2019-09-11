import { i18n } from '@/config/default.json'

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function timestamp (date, format) {
  return new Date(date * 1000).toLocaleString(i18n.defaultLocale, {
    day: 'numeric',
    month: 'numeric',
  })
}
