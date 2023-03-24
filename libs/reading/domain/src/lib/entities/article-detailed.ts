import { Article } from "./article";
import { Author } from "./author";
import { Comment } from "./comment";

export interface ArticleDetailed extends Article {
    title: string;
    articleUrl: string;
    author: Author;
    tags: string[];
    time: number;
    comments: number;
    likesCount: number;
}

export type ArticleDetailedWithComments = ArticleDetailed & { comments: Comment[] }