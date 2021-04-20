import { These } from 'fp-ts/lib/These';
import * as These_ from 'fp-ts/lib/These';

import { crashObject } from '../../helpers/crash';
import * as ruins from '../these';

type ExampleLeft = { error: number };
const exampleLeft: ExampleLeft = { error: 404 };

type ExampleRight = { result: number };
const exampleRight: ExampleRight = { result: 42 };

type ExampleThese = These<ExampleLeft, ExampleRight>;
const exampleTheseL: ExampleThese = These_.left(exampleLeft);
const exampleTheseR: ExampleThese = These_.right(exampleRight);
const exampleTheseB: ExampleThese = These_.both(exampleLeft, exampleRight);

describe('ruinThese', () => {
  it('should return right', () => {
    const result: ExampleRight = ruins.fromThese(exampleTheseR);
    expect(result).toEqual(exampleRight);
  });
  it('should throw left', () => {
    expect(() => ruins.fromThese(exampleTheseL)).toThrowError(crashObject(exampleLeft));
  });
  it('should log warnings before returning right', () => {
    const realWarn = console.warn;
    const fakeWarn = jest.fn();
    // eslint-disable-next-line fp/no-mutation
    console.warn = fakeWarn;
    expect(ruins.fromThese(exampleTheseB)).toEqual(exampleRight);
    expect(fakeWarn.mock.calls).toEqual([[exampleLeft]]);
    // eslint-disable-next-line fp/no-mutation
    console.warn = realWarn;
  });
});
