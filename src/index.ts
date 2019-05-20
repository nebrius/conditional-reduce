/*
MIT License

Copyright (c) Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export interface IConditionalDictionary<T> {
  [ key: string ]: () => T;
}

export type DefaultCase<T> = (value: string) => T;

// TODO: add a version that allows supplying a Map/WeakMap as well as a dictionary for values
export function reduce<T>(value: string, conditionals: IConditionalDictionary<T>, defaultCase?: DefaultCase<T>): T {
  const retVal = conditionals[value];
  if (!retVal) {
    if (defaultCase) {
      return defaultCase(value);
    } else {
      throw new Error(`Invalid conditional value "${value}"`);
    }
  }
  return retVal();
}

export function curry<T>(conditionals: IConditionalDictionary<T>, defaultCase?: DefaultCase<T>): (value: string) => T {
  return (value: string) => reduce<T>(value, conditionals, defaultCase);
}
