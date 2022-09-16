import { TaskThese } from 'fp-ts/lib/TaskThese';
import * as TaskThese_ from 'fp-ts/lib/TaskThese';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../task-these';

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleTaskThese = TaskThese<ExampleLeft, ExampleRight>;
const exampleTaskTheseL: ExampleTaskThese = TaskThese_.left(exampleLeft);
const exampleTaskTheseR: ExampleTaskThese = TaskThese_.right(exampleRight);
const exampleTaskTheseB: ExampleTaskThese = TaskThese_.both(exampleLeft, exampleRight);

describe('ruinTaskThese', () => {
  it('should return right', async () => {
    await expect(ruins.fromTaskThese(exampleTaskTheseR)).resolves.toEqual(exampleRight);
  });

  it('should throw left', async () => {
    await expect(ruins.fromTaskThese(exampleTaskTheseL)).rejects.toEqual(
      crashObject(exampleLeft),
    );
  });
  it('should log warnings before returning right', async () => {
    const realWarn = console.warn;
    const fakeWarn = jest.fn();
    // eslint-disable-next-line fp/no-mutation
    console.warn = fakeWarn;
    const result = await ruins.fromTaskThese(exampleTaskTheseB);
    expect(result).toEqual(exampleRight);
    expect(fakeWarn.mock.calls).toEqual([[exampleLeft]]);
    // eslint-disable-next-line fp/no-mutation
    console.warn = realWarn;
  });
});
