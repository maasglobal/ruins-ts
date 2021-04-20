# ruins-ts

Ruins-ts is a library that converts TypeScript [fp-ts](https://github.com/gcanti/fp-ts) types into primitive types familiar to most JavaScript programmers. Using ruins-ts is generally speaking a *bad idea* since the corresponding fp-ts types give much stronger guarantees about the values than their primitive JavaScript counterparts. However, if you wish you had a sledge hammer for breaking your application into smithereens, ruins-ts may be what you are looking for.

For examples we can use ruins-ts `fromEither` together with [io-ts](https://github.com/gcanti/io-ts) type definitions to crash [Jest](https://jestjs.io/) unit tests when encountering invalid test data. The crash would cause the unit test to fail. The same io-ts type definitions could be used for production code by replacing ruins-ts with [io-ts-promise](https://github.com/aeirola/io-ts-promise) or custom error-handling implementation.

```typescript
import * as ruins from 'ruins-ts';
import User from './types/user';
import joe from './joe.json';

describe('user processor', () => {

  const example: User = ruins.fromEither(User.decode(joe));

  it('should processs user', () => {

    // ...

  });
});
```

## fromOption (function)

Returns the raw value in case of [Some](https://gcanti.github.io/fp-ts/modules/Option.ts.html#some-interface) and `null` in case of [None](https://gcanti.github.io/fp-ts/modules/Option.ts.html#none-interface).

**Makes it impossible to distinguish between a null value and no value.**

#### Signature
```typescript
export function fromOption<R>(anOption: Option<R>): R | null { ... }
```

#### Example
```typescript
import { Option } from 'fp-ts/lib/Option';
import * as Option_ from 'fp-ts/lib/Option';
import * as ruins from 'ruins-ts';

const someNumber: Option<number> = Option_.some(123);
const noNumber: Option<number> = Option_.none;

ruins.fromSome(someNumber) // => 123
ruins.fromSome(noNumber) // => null

type Foo = string | null;

const stringValue: Option<Foo> = Option_.some('foo');
const nullValue: Option<Foo> = Option_.some(null);
const noValue: Option<Foo> = Option_.none;

ruins.fromSome(stringValue) // => 'foo'
ruins.fromSome(nullValue) // => null
ruins.fromSome(noValue) // => null

nullValue === noValue // => false
ruins.fromSome(nullValue) === ruins.fromSome(noValue) // => true
```


## fromEither (function)

Asserts [Right](https://gcanti.github.io/fp-ts/modules/Either.ts.html#right-interface) and returns the result.

**Throws a runtime Error on [Left](https://gcanti.github.io/fp-ts/modules/Either.ts.html#left-interface).**

#### Signature
```typescript
export function fromEither<R>(anEither: Either<unknown, R>): R { ... }
```

#### Example
```typescript
import { Either } from 'fp-ts/lib/Either';
import * as Either_ from 'fp-ts/lib/Either';
import * as ruins from 'ruins-ts';

const failure: Either<string, number> = Either_.left('error');
const success: Either<string, number> = Either_.right(123);

ruins.fromEither(failure) // => never (throws an exception)
ruins.fromEither(success) // => 123
```


## fromThese (function)

Asserts [Right](https://gcanti.github.io/fp-ts/modules/These.ts.html#right-interface) and returns the result.

**Logs warnings to console on [Both](https://gcanti.github.io/fp-ts/modules/These.ts.html#both-interface).**

**Throws a runtime Error on [Left](https://gcanti.github.io/fp-ts/modules/These.ts.html#left-interface).**

#### Signature
```typescript
export function fromThese<R>(anThese: These<unknown, R>): R { ... }
```

#### Example
```typescript
import { These } from 'fp-ts/lib/These';
import * as These_ from 'fp-ts/lib/These';
import * as ruins from 'ruins-ts';

const failure: These<string, number> = These_.left('error');
const success: These<string, number> = These_.right(123);
const neutral: These<string, number> = These_.both('warning', 456);

ruins.fromThese(failure) // => never (throws an exception)
ruins.fromThese(success) // => 123
ruins.fromThese(neutral) // => 456 (logs warning)
```


## fromIO (function)

Executes syncronous side-effects of an [IO](https://gcanti.github.io/fp-ts/modules/IO.ts.html) and returns the result.

**Breaks referential transparency.**

#### Signature
```typescript
export function fromIO<R>(anIO: IO<R>): R { ... }
```

#### Example
```typescript
import { IO } from 'fp-ts/lib/IO';
import * as ruins from 'ruins-ts';

const computation: IO<number> = () => {
  console.log('effect');
  return 123;
}

ruins.fromIO(computation) // => 123 (prints "effect")
```


## fromTask (function)

Executes asyncronous side-effects of a [Task](https://gcanti.github.io/fp-ts/modules/Task.ts.html) and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature
```typescript
export function fromTask<R>(aTask: Task<R>): Promise<R> { ... }
```

#### Example
```typescript
import { Task } from 'fp-ts/lib/IO';
import * as ruins from 'ruins-ts';

const computation: Task<number> = () => new Promise ((resolve) => {
  console.log('effect');
  resolve(123);
});

ruins.fromTask(computation) // => Promise (prints "effect", resolves to 123)
```


## fromIOEither (function)

Executes contained syncronous side-effects, asserts Right and returns the result.

**Breaks referential transparency. Throws a runtime Error on Left.**

#### Signature
```typescript
export function fromIOEither<E, R>(anIOEither: IOEither<E, R>): R { ... }
```

#### Example
```typescript
import { IOEither } from 'fp-ts/lib/IO';
import * as ruins from 'ruins-ts';

const failure: IOEither<string, number> = () => {
  console.log('effect');
  return Either_.left('error');
}

const success: IOEither<string, number> = () => {
  console.log('effect');
  return Either_.right(123);
}

ruins.fromIOEither(failure) // => never (prints "effect", throws an exception)
ruins.fromIOEither(success) // => 123 (prints "effect")
```


## fromTaskEither (function)

Executes contained asyncronous side-effects and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature
```typescript
export function fromTaskEither<E, R>(aTaskEither: TaskEither<E, R>): Promise<R> { ... }
```

#### Example
```typescript
import { TaskEither } from 'fp-ts/lib/TaskEither';
import * as ruins from 'ruins-ts';

const failure: TaskEither<string, number> = () => new Promise ((_resolve, reject) => {
  console.log('effect');
  reject(Either_.left('error'));
});

const success: TaskEither<string, number> = () => new Promise ((resolve, _reject) => {
  console.log('effect');
  resolve(Either_.right(123));
});

ruins.fromTaskEither(failure) // => Promise (prints "effect", rejects)
ruins.fromTaskEither(success) // => Promise (prints "effect", resolves to 123)
```


## fromTaskThese (function)

Executes contained asyncronous side-effects and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature
```typescript
export function fromTaskThese<E, R>(aTaskThese: TaskThese<E, R>): Promise<R> { ... }
```

#### Example
```typescript
import { TaskThese } from 'fp-ts/lib/TaskThese';
import * as ruins from 'ruins-ts';

const failure: TaskThese<string, number> = () => new Promise ((_resolve, reject) => {
  console.log('effect');
  reject(These_.left('error'));
});

const success: TaskThese<string, number> = () => new Promise ((resolve, _reject) => {
  console.log('effect');
  resolve(These_.right(123));
});

const neutral: TaskThese<string, number> = () => new Promise ((resolve, _reject) => {
  console.log('effect');
  resolve(These_.both('warning', 456));
});

ruins.fromTaskThese(failure) // => Promise (prints "effect", rejects)
ruins.fromTaskThese(success) // => Promise (prints "effect", resolves to 123)
ruins.fromTaskThese(neutral) // => Promise (prints "effect", logs warning, resolves to 456)
```
