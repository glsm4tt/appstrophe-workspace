import { AuthorFullnamePipe } from './author-fullname.pipe';

describe('AuthorFullnamePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorFullnamePipe();
    expect(pipe).toBeTruthy();
  });
});
