import * as ruins from '../ruins';

describe('Ruins-TS', () => {

  describe('ruinEither', () => {
    it('should be a function', () => {
      expect(typeof (ruins.fromEither)).toEqual('function');
      expect(typeof (ruins.fromIO)).toEqual('function');
      expect(typeof (ruins.fromIOEither)).toEqual('function');
      expect(typeof (ruins.fromOption)).toEqual('function');
      expect(typeof (ruins.fromTask)).toEqual('function');
      expect(typeof (ruins.fromTaskEither)).toEqual('function');
    });
  });
});
