import { IOEither } from 'fp-ts/lib/IOEither';
import * as IOEither_ from 'fp-ts/lib/IOEither';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../io-either';

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleIOEither = IOEither<ExampleLeft, ExampleRight>;
const exampleIOEitherL: ExampleIOEither = IOEither_.left(exampleLeft);
const exampleIOEitherR: ExampleIOEither = IOEither_.right(exampleRight);

describe('ruinIOEither', () => {

  it('should return right', () => {
    const result: ExampleRight = ruins.fromIOEither(exampleIOEitherR)
    expect(result).toEqual(exampleRight);
  });
  it('should throw left', () => {
    expect(() => ruins.fromIOEither(exampleIOEitherL)).toThrowError(
      crashObject(exampleLeft),
    );
  });
});
