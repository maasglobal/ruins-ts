import { warn } from 'fp-ts/lib/Console';
import { pipe } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { These } from 'fp-ts/lib/These';
import * as These_ from 'fp-ts/lib/These';

import { crash } from '../helpers/crash';
import { fromIO } from './io';

export const fromThese = <R>(aThese: These<unknown, R>): R =>
  pipe(
    aThese,
    These_.fold(
      (error) => {
        const crasher: IO<never> = crash(error);
        return fromIO(crasher);
      },
      (r: R) => r,
      (error, r) => {
        const warner: IO<void> = warn(error);
        fromIO(warner);
        return r;
      },
    ),
  );
