import { authFeature, initialState } from './reducers';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
