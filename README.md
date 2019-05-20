# Conditional Reduce

Like map-reduce, but for branching logic. Like a switch statement, except it's an expression that returns a value. This little helper module allows you to construct a JavaScript expression that returns a value based on an enumerated list of possible values.

This module was inspired by a conversation on [dev.to](https://dev.to/nebrius/a-new-coding-style-for-switch-statements-in-javascript-typescript-ipe/) with [Avalander](https://github.com/Avalander) and [John Papa](https://github.com/johnpapa). Thanks you two!

## Installation

Install with npm:

```
npm install conditional-reduce
```

## Usage

### Direct usage

In JavaScript:

```javascript
const { reduce } = require('conditional-reduce');

console.log(reduce('dog', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Prints "Dogs are great pets"

console.log(reduce('bird', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Throws 'Invalid conditional value "bird"' exception
```

In TypeScript:

```typescript
import { reduce } from 'conditional-reduce';

console.log(reduce<string>('dog', { // generic enforces string return type on all branches
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Prints "Dogs are great pets"

console.log(reduce<string>('bird', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Throws 'Invalid conditional value "bird"' exception
```

### Curry'd usage

If you want to reuse your conditional, you can [curry](https://en.wikipedia.org/wiki/Currying) them with the `curry` function.

In JavaScript:

```javascript
const { curry } = require('conditional-reduce');

const dogReducer = curry({
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
});

console.log(dogReducer('dog')); // Prints "Dogs are great pets"
console.log(dogReducer('bird')); // Throws 'Invalid conditional value "bird"' exception
```

In TypeScript:

```typescript
import { curry } from 'conditional-reduce';

const dogReducer = curry<string>({
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
});

console.log(dogReducer('dog')); // Prints "Dogs are great pets"
console.log(dogReducer('bird')); // Throws 'Invalid conditional value "bird"' exception
```

### Default Values

You can specify a default value, like a `switch` statement's `default` case, by adding an extra case function at the end.

In JavaScript:

```javascript
const { reduce } = require('conditional-reduce');

console.log(reduce('bird', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
}, (value) => `Your pet ${value} is probably cool too`));
```

In TypeScript:

```typescript
import { reduce } from 'conditional-reduce';

console.log(reduce<string>('bird', { // generic enforces string return type on all branches
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
}, (value: string) => `Your pet ${value} is probably cool too`)); // Prints "Your pet bird is probably cool too"
```

## API

Note: the function definitions below use the [TypeScript](https://www.typescriptlang.org/) definitions for clarity. The types are _not_ enforced in pure JavaScript, so in theory you can mix and match, but honestly I never tested that scenario and have no idea what will happen.

If you're not familiar with TypeScript syntax, there are basically three things you need to know:

1. A variables type is specified after the variable name, and separated by a `:`. For example, `x: number` means we have a variable named `x`, and it's a number.
2. A `?` after the variable name and before the `:` means that the variable is optional
3. A variable name or type followed by `<T>` means that it takes in a [generic type](https://www.typescriptlang.org/docs/handbook/generics.html) called `T`, i.e. a placeholder type that the caller fills in. `T` can be any type, but all references to `T` are of the _same_ type, whatever it may be. This type is supplied by the user when calling the function (see TypeSCript examples above).

### IConditionalDictionary

Conditional dictionaries are at the core Conditional Reduce. These are analogous to the `case` statements in a `switch` statement. Here is the TypeScript definition of the dictionary

```typescript
interface IConditionalDictionary<T> {
  [ key: string ]: () => T;
}
```

Each key in the dictionary is one of the possible values to be matched against in `reduce()`. The value is a function that takes no parameters, and returns a value. This returned value is then returned by `reduce()` to the calling code.

### function reduce<T>(value: string, conditionals: IConditionalDictionary<T>, defaultCase?: (value: string) => T): T

This function immediately reduces the `conditionals` dictionary to a single return value. If `value` is not present in the dictionary, one of two things can happen:

1. If `defaultCase` is specified, then that function is invoked. The `value` parameter passed to `reduce()` is passed along to the `defaultCase` function for your use, if desired. The value returned from `defaultCase` is then returned from `reduce`
2. If `defaultCase` is _not_ specified, then an exception is thrown

### function curry<T>(conditionals: IConditionalDictionary<T>, defaultCase?: (value: string) => T): (value: string) => T

This function splits the `reduce()` call into two steps. The first creates the conditional case, with an optional default case. The parameters supplied here behave identically to their counterparts in `reduce`. A function is returned that you can then pass a value to, which then behaves like `reduce()`.

This function is implemented under the hood as a pass through to `reduce`:

```typescript
function curry<T>(conditionals: IConditionalDictionary<T>, defaultCase?: DefaultCase<T>): (value: string) => T {
  return (value: string) => reduce<T>(value, conditionals, defaultCase);
}
```

# License

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
