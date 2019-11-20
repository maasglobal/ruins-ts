import { pipe } from 'fp-ts/lib/pipeable';
import { Task } from 'fp-ts/lib/Task';
import * as Task_ from 'fp-ts/lib/Task';

export const fromTask = <R>(aTask: Task<R>): Promise<R> => aTask();
