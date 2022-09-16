import { Task } from 'fp-ts/lib/Task';

import * as ruins from '../task';

type MutableState = unknown;
// eslint-disable-next-line
let mutableState: MutableState = false;

type Answer = 42;
const answer: Answer = 42;

const exampleTask: Task<Answer> = async () => {
  // eslint-disable-next-line
  mutableState = true;
  return answer;
};

describe('ruinTask', () => {
  it('should execute side effects', async () => {
    await expect(ruins.fromTask(exampleTask).then(() => mutableState)).resolves.toEqual(
      true,
    );
  });

  it('should return computation return value', async () => {
    await expect(ruins.fromTask(exampleTask)).resolves.toEqual(answer);
  });
});
