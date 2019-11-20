import { Either } from 'fp-ts/lib/Either';
import * as Either_ from 'fp-ts/lib/Either';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../either';

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleEither = Either<ExampleLeft, ExampleRight>;
const exampleEitherL: ExampleEither = Either_.left(exampleLeft);
const exampleEitherR: ExampleEither = Either_.right(exampleRight);

describe('ruinEither', () => {
  it('should return right', () => {
    const result: ExampleRight = ruins.fromEither(exampleEitherR);
    expect(result).toEqual(exampleRight);
  });
  it('should throw left', () => {
    expect(() => ruins.fromEither(exampleEitherL)).toThrowError(crashObject(exampleLeft));
  });
});
