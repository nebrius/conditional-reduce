export interface IConditionalDictionary<T> {
    [key: string]: () => T;
}
export declare type DefaultCase<T> = (value: string) => T;
export declare function reduce<T>(value: string, conditionals: IConditionalDictionary<T>, defaultCase?: DefaultCase<T>): T;
export declare function curry<T>(conditionals: IConditionalDictionary<T>, defaultCase?: DefaultCase<T>): (value: string) => T;
