import { crashMessage, crashObject, crash } from '../crash';

describe('crash library', () => {
  const exampleJSON: unknown = { foo: 123 };
  const exampleCyclic: unknown = {};
  // eslint-disable-next-line
  (exampleCyclic as any).foo = exampleCyclic;

  const exampleCrashMessage = crashMessage(exampleJSON);
  const exampleCrashObject = crashObject(exampleJSON);
  const exampleCrash = crash(exampleJSON);

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
      expect(exampleCrashObject).toEqual(new Error(crashMessage(exampleJSON)));
    });
  });

  describe('crash', () => {
    it('should crash', () => {
      expect(exampleCrash).toThrowError(exampleCrashObject);
    });
  });
});
