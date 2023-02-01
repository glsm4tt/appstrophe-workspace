import { Id } from "@appstrophe-workspace/shared-lib";
import { AuthorDto } from "./author";
import { Like } from "./like";
import { Comment } from './comment';

export interface ArticleDetailed extends Id {
    title: string;
    articleUrl: string;
    author: AuthorDto;
    tags: string[];
    time: number;
    comments: Partial<Comment>[];
    likes: Like[];
}
