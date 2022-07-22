import { readingFeature, initialState } from './reducers';

describe('Article Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = readingFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
