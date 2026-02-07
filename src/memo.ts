const memo = <T extends (...args: any[]) => any>(
  func: T,
  time?: number
): ((...args: Parameters<T>) => ReturnType<T>) => {
  if (typeof func !== 'function' || time !== undefined && (typeof time !== 'number' || time < 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const cache: Map<string, { value: ReturnType<T>; expireAt: number | null }> = new Map();

  const getKey = (...args: any[]): string => JSON.stringify(args);

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = getKey(args);

    const entry = cache.get(key);
    const now = Date.now();

    if (entry) {
      if (time !== undefined && entry.expireAt !== null && now >= entry.expireAt) {
        cache.delete(key);
      } else {
        if (time !== undefined) {
          entry.expireAt = now + time;
        }
        return entry.value;
      }
    }

    const value = func(...args);

    const expireAt = time === undefined ? null : now + time;
    cache.set(key, { value, expireAt });

    return value;
  };
};

export default memo;

/*
Напишите функцию-декоратор memo. Функция-декоратор принимает первым аргументом чистую оригинальную функцию 
(с аргументами или без), возвращающую некоторое значение, вторым необязательным аргументом — время в миллисекундах,
 означающее время, в течение которого нужно мемоизировать возвращаемое значение оригинальной функции, исходя из её 
 аргументов. Непереданный второй аргумент означает бесконечную мемоизацию. Функция-декоратор возвращает новую функцию,
  принимающую те же аргументы, что оригинальная и возвращающая такие же значения, как оригинальная функция при совпадающих
   аргументах. Обратите внимание, что мемоизация распространяется на каждый отдельный набор аргументов, то есть применение
    одних аргументов не сбрасывает мемоизацию результата функции при других аргументах. Кроме того, в случае ещё не
     истёкшей мемоизации по определённым аргументам вызов мемоизированной функции обновляет срок истечения мемоизации
      по этим аргументам. Для сравнения каждого из аргументов используйте shallow-сравнение, то есть в случае
       сравнения объектов, массивов или функций используйте сравнение по ссылке.

Ошибки, которые должны быть обработаны:

Первый аргумент не функция. Код ошибки INVALID_ARGUMENT.
Второй аргумент не типа number или число меньше нуля. Код ошибки INVALID_ARGUMENT.
Примеры использования:

// Предположим, в функции original — сложные вычисления
const original = (n) => n
const memoized = memo(original, 1000);
console.log(original(1))
console.log(original(1))
console.log(original(2))
// На данный момент original была вызвана лишь по одному разу с аргументами 1 и 2
// Через 1 секунду
console.log(original(1))
console.log(original(2))
// Теперь original была вызвана лишь по два раза с аргументами 1 и 2
const memoized = memo('str'); // ошибка с кодом INVALID_ARGUMENT
const memoized = memo(() => 1, -1); // ошибка с кодом INVALID_ARGUMENT
*/