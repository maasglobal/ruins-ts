import { pipe } from 'fp-ts/lib/pipeable';
import { IOEither } from 'fp-ts/lib/IOEither';
import * as IO_ from 'fp-ts/lib/IO';

import { fromIO } from './io';
import { fromEither } from './either';

export const fromIOEither = <E, R>(anIOEither: IOEither<E, R>): R =>
  pipe(anIOEither, IO_.map(fromEither), fromIO);
