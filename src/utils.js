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




// async getUserInfo() {
//   try {
//     const token = this.state.token;

//     if (!token) {
//       throw new Error("Токен отсутствует");
//     }

//     const response = await fetch("/api/v1/users/self?fields=*", {
//       method: "GET",
//       headers: {
//         "X-Token": token,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       const userData = await response.json();
//       console.log('userData',userData)
//       this.setState({
//         ...this.getState(),
//         user: userData.result,
//       });
//       return userData.result;
//     } else {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message || "Ошибка при получении данных пользователя"
//       );
//     }
//   } catch (error) {
//     console.error("Ошибка при получении данных пользователя:", error.message);
//     throw new Error("Ошибка при получении данных пользователя");
//   }
// }

// async logout() {
//   try {
//     const token = this.state.token;

//     if (!token) {
//       throw new Error("Токен отсутствует");
//     }

//     const response = await fetch("/api/v1/users/sign", {
//       method: "DELETE",
//       headers: {
//         "X-Token": token,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       this.setState(
//         {
//           ...this.getState(),
//           isAuth: false,
//           token: null,
//           user: null,
//         },
//         "Выход успешен"
//       );
//       localStorage.removeItem("accessToken");
//     } else {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Ошибка при выходе");
//     }
//   } catch (error) {
//     console.error("Ошибка при выходе:", error.message);
//     throw new Error("Ошибка при выходе");
//   }
// }


