import { pipe } from 'fp-ts/lib/pipeable';
import * as Task_ from 'fp-ts/lib/Task';
import { TaskEither } from 'fp-ts/lib/TaskEither';

import { fromTask } from './task';
import { fromEither } from './either';

export const fromTaskEither = <E, R>(aTaskEither: TaskEither<E, R>): Promise<R> =>
  pipe(aTaskEither, Task_.map(fromEither), fromTask);
