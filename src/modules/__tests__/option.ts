import { Option } from 'fp-ts/lib/Option';
import * as Option_ from 'fp-ts/lib/Option';

import * as ruins from '../option';

type Ruin = ExampleSome | null;

type ExampleSome = { result: number };
const exampleSome: ExampleSome = { result: 42 };

type ExampleOption = Option<ExampleSome>;
const exampleOption: ExampleOption = Option_.some(exampleSome);

describe('ruinOption', () => {
  it('should return value on some', () => {
    const result: Ruin = ruins.fromOption(exampleOption);
    expect(result).toEqual(exampleSome);
  });
  it('should return null on none', () => {
    const result: Ruin = ruins.fromOption(Option_.none);
    expect(result).toEqual(null);
  });
});
