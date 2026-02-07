const sort = (str : string) => {
    if (typeof str !== 'string')
        {throw new Error('INVALID_ARGUMENT');}
    return str
    .toLowerCase()
    .split(' ')
    .map(word => word.split('').sort().join(''))
    .sort((a, b) => a.length - b.length)
    .join(' ');
};



export default sort;

/*
Реализуйте функцию sort, которая принимает строку, состоящую из слов, разделенных пробелами.
В каждом слове предложения она сортирует буквы в порядке кодовых точек Unicode, а слова по количеству букв в них,
и возвращает результат в виде строки. Если в слове попадается буква в верхнем регистре,
она должна быть приведена к нижнему.

Ошибки, которые должны быть обработаны:

Переданный аргумент не типа string. Код ошибки INVALID_ARGUMENT.
Примеры использования:

sort('hello world');            // 'ehllo dlorw'
sort('привет школа Metaclass'); // 'аклош веипрт aacelmsst'
sort('1234 111');               // '111 1234'
sort(11);                       // ошибка с кодом INVALID_ARGUMENT

*/