import { TaskEither } from 'fp-ts/lib/TaskEither';
import * as TaskEither_ from 'fp-ts/lib/TaskEither';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../reader-task-either';

const exampleModel = { foo: 'model' };

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleTaskEither = TaskEither<ExampleLeft, ExampleRight>;
const exampleTaskEitherL: ExampleTaskEither = TaskEither_.left(exampleLeft);
const exampleTaskEitherR: ExampleTaskEither = TaskEither_.right(exampleRight);

describe('ruinReaderTaskEither', () => {
  it('should return right', async () => {
    await expect(
      ruins.fromReaderTaskEither(exampleModel, (_) => exampleTaskEitherR),
    ).resolves.toEqual(exampleRight);
  });

  it('should throw left', async () => {
    await expect(
      ruins.fromReaderTaskEither(exampleModel, (_) => exampleTaskEitherL),
    ).rejects.toEqual(crashObject(exampleLeft));
  });
});
