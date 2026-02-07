const removeAnagrams = (arr1 : string[]) => {
    if (!Array.isArray(arr1)) {throw new Error('INVALID_ARGUMENT');}

    const keyCount: { [key: string]: number } = {};
    const result: string[] = [];

    for (const str of arr1) {
        if (typeof str !== 'string') {throw new Error('INVALID_ELEMENT_IN_ARRAY');}
        const key = str.split('').sort().join(''); 
        if (!keyCount[key]) {
            keyCount[key] = 0;
            result.push(str); 
        }
        keyCount[key]++;
    }
    return result.filter((str, index) => {
        const key = str.split('').sort().join('');
        return keyCount[key] === 1;
    });
};

export default removeAnagrams;

/*

Реализуйте функцию removeAnagrams, которая принимает массив строк и удаляет из данного массива строки,
 являющиеся анаграммами.

Ошибки, которые должны быть обработаны:

Переданный аргумент не массив. Код ошибки INVALID_ARGUMENT.
В переданном массиве хотя бы один элемент не типа string. Код ошибки INVALID_ELEMENT_IN_ARRAY.
Примеры использования:

removeAnagrams(['cat', 'act', 'arc']);  // ['arc']
removeAnagrams(['car', 'arc']);         // []
removeAnagrams('str');                  // ошибка с кодом INVALID_ARGUMENT
removeAnagrams(['str', 5]);             // ошибка с кодом INVALID_ELEMENT_IN_ARRAY

*/