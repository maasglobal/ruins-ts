import { pipe } from 'fp-ts/lib/function';
import * as Task_ from 'fp-ts/lib/Task';
import { TaskEither } from 'fp-ts/lib/TaskEither';

import { fromEither } from './either';
import { fromTask } from './task';

export const fromTaskEither = <E, R>(aTaskEither: TaskEither<E, R>): Promise<R> =>
  pipe(aTaskEither, Task_.map(fromEither), fromTask);
