const pow = (base: unknown, exponent?: unknown): number | ((exp: unknown) => number) => {
  if (typeof base !== 'number' ) {
    throw new Error('INVALID_ARGUMENT');
  }

  if (exponent !== undefined) {
    if (typeof exponent !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return base ** exponent;
  }

  return (exp: number): number => {
    if (typeof exp !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return base ** exp;
  };
}

export default pow;

/* 
Реализуйте функцию pow, которая возвращает возведенное в степень число и 
имеет два формата вызова - pow(base, exponent) и pow(base)(exponent).

Ошибки, которые должны быть обработаны:

Хотя бы один из аргументов не типа number. Код ошибки INVALID_ARGUMENT.
Примеры использования:

pow(2, 2);        // 4
pow(2)(2);        // 4
pow(2)('2'); // ошибка с кодом INVALID_ARGUMENT
*/