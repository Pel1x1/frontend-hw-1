const dfs = (obj1 : object) => {
    if ( typeof obj1 !== "object" || obj1 === null || Array.isArray(obj1))
        {throw new Error('INVALID_ARGUMENT');} 
    
    const result : string[] = [];
    const visited = new Set<string>();

    const traverse = (node: string): void => {
        if (visited.has(node)) {return};
        visited.add(node);
        result.push(node);

        const children = obj1[node];
        if (Array.isArray(children)) {
            for (const child of children) {
                traverse(child);
            }
        }
    };

    const start = Object.keys(obj1)[0];
    if (start) traverse(start);

    return result;

};

export default dfs;

/*

Реализуйте функцию dfs, которая принимает в качестве аргумента объект,
 отражающий небинарное дерево(узел может иметь больше двух потомков) и возвращает массив узлов, 
 соответствующий обходу в глубину. Обход осуществляется слева направо (по возрастанию индекса в массиве).
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

dfs(graph) // ['A', 'B', 'D', 'E', 'C', 'F', 'G']
dfs('{}') // ошибка с кодом INVALID_ARGUMENT
*/