import { TaskEither } from 'fp-ts/lib/TaskEither';
import * as TaskEither_ from 'fp-ts/lib/TaskEither';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../task-either';

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleTaskEither = TaskEither<ExampleLeft, ExampleRight>;
const exampleTaskEitherL: ExampleTaskEither = TaskEither_.left(exampleLeft);
const exampleTaskEitherR: ExampleTaskEither = TaskEither_.right(exampleRight);

describe('ruinTaskEither', () => {
  it('should return right', () => {
    expect(ruins.fromTaskEither(exampleTaskEitherR)).resolves.toEqual(exampleRight);
  });

  it('should throw left', () => {
    expect(ruins.fromTaskEither(exampleTaskEitherL)).rejects.toEqual(
      crashObject(exampleLeft),
    );
  });
});
