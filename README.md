# ruins-ts

Ruins-ts is a library that converts TypeScript [fp-ts](https://github.com/gcanti/fp-ts) types into primitive types familiar to most JavaScript programmers. Using ruins-ts is generally speaking a _bad idea_ since the corresponding fp-ts types give much stronger guarantees about the values than their primitive JavaScript counterparts. However, if you wish you had a sledge hammer for breaking your application into smithereens, ruins-ts may be what you are looking for.

Ruins-ts was originally created as a convenience wrapper for dealing with [io-ts](https://github.com/gcanti/io-ts) codec return values. However, the [io-ts-validator](https://github.com/aeirola/io-ts-validator) has long ago surpassed ruins-ts for validation use. The ruins-ts is maintained by the time being for adhoc use, where writing a specific convenience library may not be feasible. If you have managed to read this far you may start using ruins-ts by importing it as follows.

```typescript
import * as ruins from 'ruins-ts';

ruins.fromOption; // terminates Option, returns nullable
ruins.fromEither; // terminates Either, throws on error
ruins.fromThese; // terminates These, logs warnings to console
ruins.fromIO; // terminates IO, returns the result
ruins.fromIOEither; // terminates IOEither, throws on error
ruins.fromTask; // terminates Task, returns a promise
ruins.fromTaskOption; // terminates TaskOption, resolves to nullable
ruins.fromTaskEither; // terminates TaskEither, rejects with error
ruins.fromTaskThese; // terminates TaskThese, logs warnings to console
```

## fromOption (function)

Returns the raw value in case of [Some](https://gcanti.github.io/fp-ts/modules/Option.ts.html#some-interface) and `null` in case of [None](https://gcanti.github.io/fp-ts/modules/Option.ts.html#none-interface).

**Makes it impossible to distinguish between a null value and no value.**

#### Signature

```ts
export function fromOption<R>(anOption: Option<R>): R | null { ... }
```

#### Example

```typescript
import { Option } from 'fp-ts/lib/Option';
import * as Option_ from 'fp-ts/lib/Option';

const someNumber: Option<number> = Option_.some(123);
const noNumber: Option<number> = Option_.none;

ruins.fromOption(someNumber); // => 123
ruins.fromOption(noNumber); // => null

type Foo = string | null;

const stringValue: Option<Foo> = Option_.some('foo');
const nullValue: Option<Foo> = Option_.some(null);
const noValue: Option<Foo> = Option_.none;

ruins.fromOption(stringValue); // => 'foo'
ruins.fromOption(nullValue); // => null
ruins.fromOption(noValue); // => null

nullValue === noValue; // => false
ruins.fromOption(nullValue) === ruins.fromOption(noValue); // => true
```

## fromEither (function)

Asserts [Right](https://gcanti.github.io/fp-ts/modules/Either.ts.html#right-interface) and returns the result.

**Throws a runtime Error on [Left](https://gcanti.github.io/fp-ts/modules/Either.ts.html#left-interface).**

#### Signature

```ts
export function fromEither<R>(anEither: Either<unknown, R>): R { ... }
```

#### Example

```typescript
import { Either } from 'fp-ts/lib/Either';
import * as Either_ from 'fp-ts/lib/Either';

const failureE: Either<string, number> = Either_.left('error');
const successE: Either<string, number> = Either_.right(123);

ruins.fromEither(failureE); // => never (throws an exception)
ruins.fromEither(successE); // => 123
```

## fromThese (function)

Asserts [Right](https://gcanti.github.io/fp-ts/modules/These.ts.html#right-interface) and returns the result.

**Logs warnings to console on [Both](https://gcanti.github.io/fp-ts/modules/These.ts.html#both-interface).**

**Throws a runtime Error on [Left](https://gcanti.github.io/fp-ts/modules/These.ts.html#left-interface).**

#### Signature

```ts
export function fromThese<R>(aThese: These<unknown, R>): R { ... }
```

#### Example

```typescript
import { These } from 'fp-ts/lib/These';
import * as These_ from 'fp-ts/lib/These';

const failureT: These<string, number> = These_.left('error');
const successT: These<string, number> = These_.right(123);
const neutralT: These<string, number> = These_.both('warning', 456);

ruins.fromThese(failureT); // => never (throws an exception)
ruins.fromThese(successT); // => 123
ruins.fromThese(neutralT); // => 456 (logs warning)
```

## fromIO (function)

Executes syncronous side-effects of an [IO](https://gcanti.github.io/fp-ts/modules/IO.ts.html) and returns the result.

**Breaks referential transparency.**

#### Signature

```ts
export function fromIO<R>(anIO: IO<R>): R { ... }
```

#### Example

```typescript
import { IO } from 'fp-ts/lib/IO';

const syncComputation: IO<number> = () => {
  console.log('effect');
  return 123;
};

ruins.fromIO(syncComputation); // => 123 (prints "effect")
```

## fromIOEither (function)

Executes contained syncronous side-effects, asserts Right and returns the result.

**Breaks referential transparency. Throws a runtime Error on Left.**

#### Signature

```ts
export function fromIOEither<E, R>(anIOEither: IOEither<E, R>): R { ... }
```

#### Example

```typescript
import { IOEither } from 'fp-ts/lib/IOEither';

const failureIOE: IOEither<string, number> = () => {
  console.log('effect');
  return Either_.left('error');
};

const successIOE: IOEither<string, number> = () => {
  console.log('effect');
  return Either_.right(123);
};

ruins.fromIOEither(failureIOE); // => never (prints "effect", throws an exception)
ruins.fromIOEither(successIOE); // => 123 (prints "effect")
```

## fromTask (function)

Executes asyncronous side-effects of a [Task](https://gcanti.github.io/fp-ts/modules/Task.ts.html) and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature

```ts
export function fromTask<R>(aTask: Task<R>): Promise<R> { ... }
```

#### Example

```typescript
import { Task } from 'fp-ts/lib/Task';

const asyncComputation: Task<number> = () =>
  new Promise((resolve) => {
    console.log('effect');
    resolve(123);
  });

ruins.fromTask(asyncComputation); // => Promise (prints "effect", resolves to 123)
```

## fromTaskOption (function)

Executes contained asyncronous side-effects and returns nullable result wrapped in a promise.

**Breaks referential transparency.**

#### Signature

```ts
export function fromTaskOption<R>(aTaskOption: TaskOption<R>): Promise<R|null> { ... }
```

#### Example

```typescript
import { TaskOption } from 'fp-ts/lib/TaskOption';

const failureTO: TaskOption<number> = () =>
  new Promise((_resolve, reject) => {
    console.log('effect');
    reject(Option_.none);
  });

const successTO: TaskOption<number> = () =>
  new Promise((resolve, _reject) => {
    console.log('effect');
    resolve(Option_.some(123));
  });

ruins.fromTaskOption(failureTO); // => Promise (prints "effect", resolves to null)
ruins.fromTaskOption(successTO); // => Promise (prints "effect", resolves to 123)
```

## fromTaskEither (function)

Executes contained asyncronous side-effects and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature

```ts
export function fromTaskEither<E, R>(aTaskEither: TaskEither<E, R>): Promise<R> { ... }
```

#### Example

```typescript
import { TaskEither } from 'fp-ts/lib/TaskEither';

const failureTE: TaskEither<string, number> = () =>
  new Promise((_resolve, reject) => {
    console.log('effect');
    reject(Either_.left('error'));
  });

const successTE: TaskEither<string, number> = () =>
  new Promise((resolve, _reject) => {
    console.log('effect');
    resolve(Either_.right(123));
  });

ruins.fromTaskEither(failureTE); // => Promise (prints "effect", rejects)
ruins.fromTaskEither(successTE); // => Promise (prints "effect", resolves to 123)
```

## fromTaskThese (function)

Executes contained asyncronous side-effects and returns the result wrapped in a promise.

**Breaks referential transparency.**

#### Signature

```ts
export function fromTaskThese<E, R>(aTaskThese: TaskThese<E, R>): Promise<R> { ... }
```

#### Example

```typescript
import { TaskThese } from 'fp-ts/lib/TaskThese';

const failureTT: TaskThese<string, number> = () =>
  new Promise((_resolve, reject) => {
    console.log('effect');
    reject(These_.left('error'));
  });

const successTT: TaskThese<string, number> = () =>
  new Promise((resolve, _reject) => {
    console.log('effect');
    resolve(These_.right(123));
  });

const neutralTT: TaskThese<string, number> = () =>
  new Promise((resolve, _reject) => {
    console.log('effect');
    resolve(These_.both('warning', 456));
  });

ruins.fromTaskThese(failureTT); // => Promise (prints "effect", rejects)
ruins.fromTaskThese(successTT); // => Promise (prints "effect", resolves to 123)
ruins.fromTaskThese(neutralTT); // => Promise (prints "effect", logs warning, resolves to 456)
```
