import * as Either_ from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import * as Json_ from 'fp-ts/lib/Json';

export const crashMessage = (originalError: unknown): string =>
  pipe(
    Json_.stringify(originalError),
    Either_.getOrElse(() => String(originalError)),
  );

export const crashObject = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  const errorMessage = crashMessage(error);
  return new Error(errorMessage);
};

export const crash = (error: unknown): IO<never> => () => {
  // eslint-disable-next-line fp/no-throw
  throw crashObject(error);
};
