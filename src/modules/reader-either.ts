import { pipe } from 'fp-ts/lib/function';
import { ReaderEither } from 'fp-ts/ReaderEither';

import { fromEither } from './either';

export const fromReaderEither = <M, R>(
  model: M,
  aReaderEither: ReaderEither<M, unknown, R>,
): R => pipe(model, aReaderEither, fromEither);
