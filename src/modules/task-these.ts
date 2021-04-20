import { pipe } from 'fp-ts/lib/function';
import * as Task_ from 'fp-ts/lib/Task';
import { TaskThese } from 'fp-ts/lib/TaskThese';

import { fromTask } from './task';
import { fromThese } from './these';

export const fromTaskThese = <E, R>(aTaskThese: TaskThese<E, R>): Promise<R> =>
  pipe(aTaskThese, Task_.map(fromThese), fromTask);
