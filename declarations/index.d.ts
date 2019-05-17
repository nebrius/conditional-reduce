export declare function conditionalReduce<T>(value: string, conditionals: {
    [value: string]: () => T;
}): T;
