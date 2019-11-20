import { IO } from 'fp-ts/lib/IO';

import * as ruins from '../io';

type MutableState = unknown;
// eslint-disable-next-line
let mutableState: MutableState = false;

type Answer = 42;
const answer: Answer = 42;

const exampleIO: IO<Answer> = () => {
  // eslint-disable-next-line
  mutableState = true;
  return answer;
};

const switcharoo = (_a: Answer): MutableState => mutableState;

describe('ruinIO', () => {
  it('should execute side effects', () => {
    expect(switcharoo(ruins.fromIO(exampleIO))).toEqual(true);
  });
  it('should return answer', () => {
    expect(ruins.fromIO(exampleIO)).toEqual(answer);
  });
});
