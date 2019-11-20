# ruins-ts

Ruins-ts is a library that converts TypeScript [fp-ts](https://github.com/gcanti/fp-ts) types into primitive types familiar to most JavaScript programmers. Using ruins-ts is generally speaking a *bad idea* since the corresponding fp-ts types give much stronger guarantees about the values than their primitive JavaScript counterparts. However, if you wish you had a sledge hammer for breaking your application into smithereens, ruins-ts may be what you are looking for.

## fromEither

`fromEither` can be used together with [io-ts](https://github.com/gcanti/io-ts) type definitions to crash unit tests when encountering invalid test data. The crash would cause the unit test to fail. The same io-ts type definitions could be used for production code by replacing ruins-ts with [io-ts-promise](https://github.com/aeirola/io-ts-promise) or custom error-handling implementation.

```typescript
import * as ruins from 'ruins-ts';
import User from './types/user';
import joe from './joe.json';

const example: User = ruins.fromEither(User.decode(joe));
```

