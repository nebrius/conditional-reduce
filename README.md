# Conditional Reduce

Like map-reduce, but for branching logic. Like a switch statement, except it's an expression that returns a value. This little helper module allows you to construct a JavaScript expression that returns a value based on an enumerated list of possible values.

This module was inspired by a conversation on [dev.to](https://dev.to/nebrius/a-new-coding-style-for-switch-statements-in-javascript-typescript-ipe/) with [Avalander](https://github.com/Avalander) and [John Papa](https://github.com/johnpapa). Thanks you two!

## Installation

Install with npm:

```
npm install conditional-reduce
```

## Usage

In JavaScript:

```javascript
const { conditionalReduce } = require('conditional-reduce');

console.log(conditionalReduce('dog', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Prints "Dogs are great pets"

console.log(conditionalReduce('bird', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Throws 'Invalid conditional value "bird"' exception
```

In TypeScript:

```typescript
import { conditionalReduce } from 'conditional-reduce';

console.log(conditionalReduce<string>('dog', { // generic enforces string return type on all branches
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Prints "Dogs are great pets"

console.log(conditionalReduce<string>('bird', {
  dog: () => 'Dogs are great pets',
  cat: () => 'Cat\'s are also great'
})); // Throws 'Invalid conditional value "bird"' exception
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
