/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getPagination(options) {
  const { length, totalCount, currentPage } = options;

  const numberOfPages = Math.ceil(totalCount / length);

  if (currentPage > numberOfPages || currentPage < 1) {
    throw Error("Wrong current page", currentPage);
  }

  if (numberOfPages <= 5) {
    return Array.from({ length: numberOfPages }, (_, i) => i + 1);
  }

  const pages = [1, 2, 3];

  if (currentPage > 3) {
    pages.push("...");
  }

  if (currentPage <= numberOfPages - 2) {
    pages.push(currentPage - 1, currentPage, currentPage + 1);
  } else {
    pages.push(numberOfPages - 2, numberOfPages - 1, numberOfPages);
  }

  if (currentPage < numberOfPages - 2) {
    pages.push("...");
  }

  pages.push(numberOfPages);

  return pages;
}

