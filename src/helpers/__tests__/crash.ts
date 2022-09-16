import { crash, crashMessage, crashObject } from '../crash';

describe('crash library', () => {
  const exampleJSON: unknown = { foo: 123 };
  const exampleCyclic: unknown = {};
  const exampleError: Error = new Error('Boom!');

  // eslint-disable-next-line
  (exampleCyclic as any).foo = exampleCyclic;

  const exampleCrashMessage = crashMessage(exampleJSON);
  const exampleCrashObject1 = crashObject(exampleJSON);
  const exampleCrashObject2 = crashObject(exampleError);
  const exampleCrash1 = crash(exampleJSON);
  const exampleCrash2 = crash(exampleError);

  describe('crashMessage', () => {
    it('should return input as JSON if possible', () => {
      expect(exampleCrashMessage).toEqual(JSON.stringify(exampleJSON));
    });
    it('should fallback to String() when JSON is not an option', () => {
      expect(crashMessage(exampleCyclic)).toEqual(String(exampleCyclic));
    });
  });

  describe('crashObject', () => {
    it('should return an error object', () => {
      expect(exampleCrashObject1).toEqual(new Error(crashMessage(exampleJSON)));
    });
    it('should return an error object unchanged', () => {
      expect(exampleCrashObject2).toEqual(exampleError);
    });
  });

  describe('crash', () => {
    it('should crash', () => {
      expect(exampleCrash1).toThrowError(exampleCrashObject1);
    });
    it('should crash', () => {
      expect(exampleCrash2).toThrowError(exampleCrashObject2);
    });
  });
});
