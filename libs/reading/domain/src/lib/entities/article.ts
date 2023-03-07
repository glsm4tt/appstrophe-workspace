import { Author, AuthorDto } from './author';
import { Id } from "@appstrophe-workspace/shared-lib";

export interface ArticleDto extends Id {
    title: string;
    description: string;
    author: AuthorDto;
    tags: string[];
    time: number;
    comments: number;
    likesCount: number;
    views: number;
}

export interface Article extends ArticleDto {
    imageUrl: string;
    author: Author;
}