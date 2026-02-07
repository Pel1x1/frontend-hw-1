const bfs = (obj1 : object) => {
    if ( typeof obj1 !== "object" || obj1 === null || Array.isArray(obj1))
        {throw new Error('INVALID_ARGUMENT');} 
    
    const result: string[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];

    const start = Object.keys(obj1)[0];
    if (!start) return result;

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift()!;
        result.push(node);

        const children = obj1[node];
        if (Array.isArray(children)) {
            for (const child of children) {
                if (!visited.has(child)) {
                    visited.add(child);
                    queue.push(child);
                }
            }
        }
    }

    return result;


};

export default bfs;

/*
Реализуйте функцию bfs, которая принимает в качестве аргумента объект,
 отражающий небинарное дерево(узел может иметь больше двух потомков) и возвращает массив узлов,
  соответствующий обходу в ширину. Обход осуществляется слева направо(по возрастанию индекса в массиве).

Пример графа:
            A 
          /   \ 
         B     C 
        /  \   / \ 
       D    E F   G

Этот же граф в виде объекта:
const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F', 'G'],
    D: [],
    E: [],
    F: [],
    G: [],
};
Ошибки, которые должны быть обработаны:

Переданный аргумент не объект. Код ошибки INVALID_ARGUMENT.
Примеры использования:

bfs(graph) // ['A', 'B', 'С', 'D', 'E', 'F', 'G']
bfs('{}') // ошибка с кодом INVALID_ARGUMENT
*/