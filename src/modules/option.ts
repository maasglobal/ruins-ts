import { pipe } from 'fp-ts/lib/pipeable';
import { Option } from 'fp-ts/lib/Option';
import * as Option_ from 'fp-ts/lib/Option';

export const fromOption = <R>(anOption: Option<R>): R | null =>
  pipe(
    anOption,
    Option_.getOrElse((): R | null => null),
  );
