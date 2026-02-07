const planEvent = (fun : Function, time : number): Promise<any> => {
    if ( typeof fun !== "function" || typeof time !== "number")
        {throw new Error('INVALID_ARGUMENT');} 
    return new Promise((resolve) => {
        const delay = time <= 0 ? 0 : time;
        setTimeout(() => {
        const result = fun();
        resolve(result);
        }, delay);
    });
};

export default planEvent;

/*
Реализуйте функцию planEvent, которая планирует вызов функции cb
 через некоторое время(timeout) и возвращает Promise с результатом выполнения функции cb.
  В случае timeout <= 0 вызов должен произойти сразу же. Подробнее о Promise и async/await можно прочесть здесь.

Ошибки, которые должны быть обработаны:

Первый аргумент не типа function. Код ошибки INVALID_ARGUMENT.
Второй аргумент не типа number. Код ошибки INVALID_ARGUMENT.
Примеры использования:

const f = () => 'Done';
const result = await planEvent(f, 3000);
//Через 3 секунды
console.log(result); // 'Done'
const result = await planEvent('str', 3000); // ошибка с кодом INVALID_ARGUMENT
const result = await planEvent(() => 'Done', '3000'); // ошибка с кодом INVALID_ARGUMENT
*/