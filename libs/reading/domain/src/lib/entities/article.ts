import { Author, AuthorDto } from './author';
import { Id } from "@appstrophe-workspace/shared-lib";
import { Like } from './like';

export interface ArticleDto extends Id {
    title: string;
    description: string;
    author: AuthorDto;
    tags: string[];
    time: number;
    comments: number;
    likes: Like[];
}

export interface Article extends ArticleDto {
    imageUrl: string;
    author: Author;
}