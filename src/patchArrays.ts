// @ts-nocheck

const patchArrays = (): void => {
    Array.prototype.count = function () {
        return this.length;
    };
    Array.prototype.insert = function (index: any, item: any) {
        if (typeof index !== 'number' ) 
            {throw new Error('INVALID_ARGUMENT');}

        const pos = Math.max(0, Math.min(index, this.length));
        this.splice(pos, 0, item);
        return this;
    }
    Array.prototype.remove = function (item: any) {
        const idx = this.indexOf(item);
        if (idx == -1) {return this;}
        this.splice(idx, 1);
        return this;
    }

};

export default patchArrays;

/*
Реализуйте функцию patchArrays, которая для всех массивов добавляет следующие методы:

Метод count возвращает длину массива.
Метод insert осуществляет вставку элемента в массив по индексу и возвращает измененный данный массив.
 В случае отрицательного индекса, элемент становится первым. Если индекс > длинны массива, элемент становится последним.
Метод remove удаляет из массива первый встречающийся элемент с таким значением и возвращает измененный данный массив.
 Если такого элемента в массиве нет, он возвращает неизмененный данный массив.
Подсказка

Ошибки, которые должны быть обработаны:

Первый аргумент метода insert не типа number. Код ошибки INVALID_ARGUMENT.
Примеры использования:

[1, 2, 3].count();    // 3
[].count();           // 0
const arr = [];
arr.insert(10, 1);     // [1]
arr.insert(1, 'name'); // [1, 'name']
arr.insert(1, null);   // [1, null, 'name']
arr.insert(0, null);   // [null, 1, null, 'name']
arr.remove(2);         // [null, 1, null, 'name']
arr.remove(1);         // [null, null, 'name']
arr.remove('name');    // [null, null]
arr.remove(null);      // [null]
arr.remove(null).insert('2');      // ['2']
[].insert('0', null) // ошибка с кодом INVALID_ARGUMENT
*/