import { pipe } from 'fp-ts/lib/function';
import { ReaderTaskEither } from 'fp-ts/ReaderTaskEither';

import { fromTaskEither } from './task-either';

export const fromReaderTaskEither = <M, E, R>(
  model: M,
  aReaderTaskEither: ReaderTaskEither<M, E, R>,
): Promise<R> => pipe(model, aReaderTaskEither, fromTaskEither);
