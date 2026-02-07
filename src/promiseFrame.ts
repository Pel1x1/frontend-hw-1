type FunctionType<T> = () => Promise<T> | T;

type FunctionResultsUnion<
  T extends ReadonlyArray<FunctionType<any>>
> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>;
}[number];

const promiseFrame = async <
  T extends ReadonlyArray<FunctionType<any>>,
  ResultsT = FunctionResultsUnion<T>
>(
  functions: T,
  limit?: number
): Promise<ResultsT[]> => {
  if (!Array.isArray(functions) || limit !== undefined && (typeof limit !== "number" || limit <= 0)) {
    throw new Error("INVALID_ARGUMENT");
  }
  if (functions.length === 0) return [] as ResultsT[];
  const results = new Array<ResultsT>(functions.length) as ResultsT[];

  if (limit === undefined) {
    const promises = functions.map((fn, i) =>
      Promise.resolve(fn()).then((res) => {
        results[i] = res;
        return res;
      })
    );
    try {
      await Promise.all(promises);
    } catch (e) {
      throw e; 
    }
    return results;
  }

  let nextIndex = 0;
  let runningCount = 0;

  await new Promise<void>((resolve, reject) => {
    const processNext = () => {
      while (runningCount < limit && nextIndex < functions.length) {
        const i = nextIndex++;
        runningCount++;

        Promise.resolve(functions[i]())
          .then((value) => {
            results[i] = value as ResultsT;
            runningCount--;
            if (nextIndex < functions.length || runningCount > 0) {
              processNext();
            } else {
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      }

      if (nextIndex >= functions.length && runningCount === 0) {
        resolve();
      }
    };

    processNext();
  });

  return results;
};

export default promiseFrame;


/*
Напишите функцию promiseFrame. 
Функция принимает первым аргументом массив асинхронных функций,
 не принимающих аргументов и возвращающих некоторые результаты (не void),
  вторым необязательным аргументом — максимальное количество промисов,
   которое может выполняться одновременно. Согласно заданному лимиту на 
   одновременное выполнение, функция параллельно обрабатывает переданные 
   асинхронные функции и возвращает Promise, удовлетворяющийся с массивом 
   результатов выполнения функций в порядке, в котором были переданы функции 
   (но не в порядке их выполнения). В случае, если лимит на одновременное
    выполнение промисов не передан, ограничение накладываться не должно 
    и функция должна вести себя аналогично Promise.all. Если хотя бы одна асинхронная
     функция выкидывает ошибку, promiseFrame должен выбросить ту же ошибку и только её.
      Обратите внимание, что ограничение на количество одновременных выполнений не означает 
      разделение функций на подмножества и порционное их выполнение: если имеются ещё не выполненные 
      функции и лимит на одновременное их выполнение не исчерпан, следующая по порядку 
      функция должна выполняться. Заметьте, что переданные функции могут быть и синхронными 
      — в таком случае в результаты выполнения должен попасть просто результат вызова 
      такой функции, при этом из функции promiseFrame необходимо также вернуть Promise.

Ошибки, которые должны быть обработаны:

Первый аргумент не массив. Код ошибки INVALID_ARGUMENT.
Второй аргумент не типа number или число не больше нуля. Код ошибки INVALID_ARGUMENT.
Примеры использования:

// getValueAfterTime — гипотетическая функция, возвращающая значение из первого аргумента
// спустя время в миллисекундах, переданное во втором аргументе
const asyncFunc1 = async () => await getValueAfterTime(1, 2000)
const asyncFunc2 = async () => await getValueAfterTime('a', 500);
const syncFunc = () => 3
const results = await promiseFrame([asyncFunc1, asyncFunc2, syncFunc], 2);
// Через 2 секунды
console.log(results); // [1, 'a', 3]
const results = await promiseFrame('str'); // ошибка с кодом INVALID_ARGUMENT
const results = await promiseFrame([() => 'a'], -1); // ошибка с кодом INVALID_ARGUMENT

*/