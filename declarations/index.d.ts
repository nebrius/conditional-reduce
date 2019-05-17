export declare function reduce<T>(value: string, conditionals: {
    [value: string]: () => T;
}): T;
export declare function curry<T>(conditionals: {
    [value: string]: () => T;
}): (value: string) => T;
