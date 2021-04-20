import { pipe } from 'fp-ts/lib/function';
import * as IO_ from 'fp-ts/lib/IO';
import { IOEither } from 'fp-ts/lib/IOEither';

import { fromEither } from './either';
import { fromIO } from './io';

export const fromIOEither = <E, R>(anIOEither: IOEither<E, R>): R =>
  pipe(anIOEither, IO_.map(fromEither), fromIO);
