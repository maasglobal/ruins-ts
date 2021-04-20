import * as ruins from '../ruins';

describe('Ruins-TS', () => {
  it('should provide functions', () => {
    expect(typeof ruins.fromEither).toEqual('function');
    expect(typeof ruins.fromThese).toEqual('function');
    expect(typeof ruins.fromIO).toEqual('function');
    expect(typeof ruins.fromIOEither).toEqual('function');
    expect(typeof ruins.fromOption).toEqual('function');
    expect(typeof ruins.fromTask).toEqual('function');
    expect(typeof ruins.fromTaskEither).toEqual('function');
    expect(typeof ruins.fromTaskThese).toEqual('function');
  });
});
