const getNumberProps = (obj1 : object) => {
    if ( typeof obj1 !== "object" || obj1 === null || Array.isArray(obj1))
        {throw new Error('INVALID_ARGUMENT');} 
    const result: string[] = [];

    function traverse(obj: object): void {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as any)[key];
        if (typeof value === 'number') {
          result.push(key);
        } else if (typeof value === 'object' && value !== null) {
          traverse(value);
        }
      }
    }
  }

  traverse(obj1);
  return result.sort();
};

export default getNumberProps;

/*
Реализуйте функцию getNumberProps, которая принимает в качестве аргумента объект,
 свойствами которого могут быть другие объекты с неограниченным уровнем вложенности,
  и возвращает отсортированный массив названий всех численных свойств исходного и вложенных объектов.

Ошибки, которые должны быть обработаны:

Переданный аргумент не объект. Код ошибки INVALID_ARGUMENT.
Примеры использования:

getNumberProps({ a: 1, c: 1, b: { c: 2, d: 1, e: '1' }, m: 3 }); // ['a', 'c', 'c', 'd', 'm']
getNumberProps('{ a: 1, b: { e: 4}}') ошибка с кодом INVALID_ARGUMENT
*/