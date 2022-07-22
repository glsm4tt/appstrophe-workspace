import * as fromArticle from './reducers';
import { selectArticles } from './selectors';

describe('Article Selectors', () => {
  it('should select the feature state', () => {
    const result = selectArticles({
      [fromArticle.ARTICLE_FEATURE_KEY]: {}
    });

    expect(result).toEqual({});
  });
});
