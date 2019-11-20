import { pipe } from 'fp-ts/lib/pipeable';
import * as Either_ from 'fp-ts/lib/Either';
import { IO } from 'fp-ts/lib/IO';

export const crashMessage = (originalError: unknown): string => pipe(
  Either_.stringifyJSON(originalError, () => null),
  Either_.getOrElse((encodingError: null) => String(originalError)),
);
export const crashObject = (error: unknown): Error => {
  const errorMessage = crashMessage(error);
  return new Error(errorMessage);
}

export const crash = (error: unknown): IO<never> => () => {
  throw crashObject(error);
};
