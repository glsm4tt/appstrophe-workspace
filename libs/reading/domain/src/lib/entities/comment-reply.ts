import { Author } from './author';
import { Like } from './like';
import { Id } from "@appstrophe-workspace/shared-lib";

export interface CommentReply extends Id {
    author: Author;
    date: Date;
    text: string;
    likes: Like[];
}