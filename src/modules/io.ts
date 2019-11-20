import { IO } from 'fp-ts/lib/IO';
import * as IO_ from 'fp-ts/lib/IO';

export const fromIO = <R>(anIO: IO<R>): R => anIO();
