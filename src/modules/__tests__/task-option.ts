import { TaskOption } from 'fp-ts/lib/TaskOption';
import * as TaskOption_ from 'fp-ts/lib/TaskOption';

import * as ruins from '../task-option';

type Example = { result: number };
const example: Example = { result: 42 };

type ExampleTaskOption = TaskOption<Example>;
const exampleTaskOptionN: ExampleTaskOption = TaskOption_.none;
const exampleTaskOptionS: ExampleTaskOption = TaskOption_.some(example);

describe('ruinTaskOption', () => {
  it('should return value of some', async () => {
    await expect(ruins.fromTaskOption(exampleTaskOptionS)).resolves.toEqual(example);
  });

  it('should convert none to null', async () => {
    await expect(ruins.fromTaskOption(exampleTaskOptionN)).resolves.toEqual(null);
  });
});
