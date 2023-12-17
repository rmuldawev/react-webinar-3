import { useEffect, useState } from "react";

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const convertCategories = (categories) => {
  const categoryArr = new Map();

  categories.forEach((category) => {
    categoryArr.set(category._id, { ...category, children: [] });
  });

  const treesArr = [];
  categoryArr.forEach((category) => {
    if (category.parent) {
      categoryArr.get(category.parent._id).children.push(category);
    } else {
      treesArr.push(category);
    }
  });

  return treesArr;
};

export const modifiedCategories = (categoriesTreesArray) => {
  const getNested = (tree, options = [], nesting = "") => {
    const category = {
      title: nesting + tree.title,
      value: tree._id,
      key: tree._id,
    };

    if (tree.children.length > 0) {
      for (const child of tree.children) {
        options.push(getNested(child, [], " - " + nesting));
      }
      return [category, ...options];
    } else {
      return [category];
    }
  };

  let options = [];
  for (let tree of categoriesTreesArray) {
    options.push(getNested(tree));
  }

  while (options.some((option) => Array.isArray(option))) {
    options = options.flat();
  }

  return options;
};
