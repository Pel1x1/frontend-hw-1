const sum = (...args: any[]) : number => {
    if (args.length < 2) {
        throw new Error('INVALID_ARGUMENTS_COUNT');
    }
    if (args.some(element => typeof element !== 'number')){
        throw new Error('INVALID_ARGUMENT');
    }

    return args.reduce((acc, num) => acc + (num as number), 0);

};

export default sum;
