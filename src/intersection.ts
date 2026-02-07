const intersection = (arr1 : any[], arr2 : any[]) => {
    if (arr1 === undefined || arr2 === undefined)
    {
        throw new Error('INVALID_ARGUMENTS_COUNT');
    }
    if (!Array.isArray(arr1) || !Array.isArray(arr2))
    {
       throw new Error('INVALID_ARGUMENT');
    }
    if (arr1.some(element => typeof element !== 'number')){
        throw new Error('INVALID_ELEMENT_IN_ARRAY');
    }
    if (arr2.some(element => typeof element !== 'number')){
        throw new Error('INVALID_ELEMENT_IN_ARRAY');
    }
    
    let arr3: Number[] = [];
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    
    arr1.forEach(element => {
        arr2.forEach(element2 => {
            if (element == element2){
                if (!(arr3.includes(element)))    
                {arr3.push(element)}
            }
        });
    });
    return arr3;
};



export default intersection;

/* 
Реализуйте функцию intersection, которая принимает два массива чисел и возвращает массив чисел, присутствующих в первом и во втором массивах.

Ошибки, которые должны быть обработаны:

Не переданы два аргумента. Код ошибки INVALID_ARGUMENTS_COUNT.
Хотя бы один из аргументов функции не массив. Код ошибки INVALID_ARGUMENT.
Хотя бы один из элементов массива не типа number. Код ошибки INVALID_ELEMENT_IN_ARRAY.
Примеры использования:

intersection([1], [2]);            // []
intersection([1, 2], [3, 2, 1]);   // [1, 2]
intersection([1, 1], [1, 1]);      // [1]
intersection([1, 2, 1], [1]);      // [1]
intersection([], []);              // []
intersection()                     // ошибка с кодом INVALID_ARGUMENTS_COUNT
intersection([], '[]')             // ошибка с кодом INVALID_ARGUMENT
intersection([], [1, '2'])         // ошибка с кодом INVALID_ELEMENT_IN_ARRAY
*/