import { pipe } from 'fp-ts/lib/function';
import * as Task_ from 'fp-ts/lib/Task';
import { TaskOption } from 'fp-ts/lib/TaskOption';

import { fromOption } from './option';
import { fromTask } from './task';

export const fromTaskOption = <R>(aTaskOption: TaskOption<R>): Promise<R | null> =>
  pipe(aTaskOption, Task_.map(fromOption), fromTask);
