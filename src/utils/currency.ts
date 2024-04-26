import { CurrencyType } from 'src/__generated__/AccountifyAPI'
import type { Locale } from '../enum'

type MergeLocaleType = Locale | 'ja' | 'en'

const currencyFormatterCache: Map<string, Intl.NumberFormat> = new Map()

// Please only use it when you can't <Currency> as the react element, for example use currency on the i18next as parameter
export function formatCurrencyAsCompact(value: number, locale: MergeLocaleType, currency?: CurrencyType): string {
  if (!currency) {
    return value.toString()
  }

  const key = `${locale} + ${currency}notation:compact`
  if (currencyFormatterCache.has(key)) {
    return currencyFormatterCache.get(key)!.format(value)
  }

  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3
  })

  currencyFormatterCache.set(key, formatter)

  return formatter.format(value)
}

// Please only use it when you can't <Currency> as the react element, for example use currency on the i18next as parameter
export function formatCurrencyAsStandard(value: number, locale: MergeLocaleType, currency?: string): string {
  if (!currency) {
    return value ? value.toString() : ''
  }

  const key = `${locale} + ${currency}notation:standard`
  if (currencyFormatterCache.has(key)) {
    return currencyFormatterCache.get(key)!.format(value)
  }

  const formatter = new Intl.NumberFormat(locale as string, {
    currency,
    style: 'currency'
  })

  currencyFormatterCache.set(key, formatter)

  return formatter.format(value)
}
