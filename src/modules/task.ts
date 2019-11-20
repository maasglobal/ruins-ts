import { Task } from 'fp-ts/lib/Task';

export const fromTask = <R>(aTask: Task<R>): Promise<R> => aTask();
