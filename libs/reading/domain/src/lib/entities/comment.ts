import { Id } from '@appstrophe-workspace/shared-lib';
import { Author } from './author';
import { Like } from './like';

export interface Comment extends Id {
    author: Author;
    date: Date;
    text: string;
    likes: Like[];
}