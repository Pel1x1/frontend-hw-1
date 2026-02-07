const multiply = (a : number) => {
    if (typeof a !== 'number')
        {throw new Error('INVALID_ARGUMENT');}
    

    return function (b : number) {
        if (typeof b !== 'number') 
            {throw new Error('INVALID_ARGUMENT');}
        return a * b;
}
};

export default multiply;

/*
Реализуйте функцию multiply.

Ошибки, которые должны быть обработаны:

Один из аргументов не типа number. Код ошибки INVALID_ARGUMENT.
Примеры использования:

const multiplyByTen = multiply(10);
multiplyByTen(2);   // 20
const multiplyByTwo = multiply(2);
multiplyByTwo(3);   // 6
const multiplyByTwo = multiply(["two"]); ошибка с кодом INVALID_ARGUMENT
const multiplyByTwo = multiply(2);
multiplyByTwo('3');   // ошибка с кодом INVALID_ARGUMENT
*/