import { pipe } from 'fp-ts/lib/pipeable';
import { IO } from 'fp-ts/lib/IO';
import { Either } from 'fp-ts/lib/Either';
import * as Either_ from 'fp-ts/lib/Either';

import { crash } from '../helpers/crash';
import { fromIO } from './io';

export const fromEither = <R>(anEither: Either<unknown, R>): R =>
  pipe(
    anEither,
    Either_.getOrElse((error: unknown): R => {
      const crasher: IO<never> = crash(error);
      return fromIO(crasher);
    }),
  );
