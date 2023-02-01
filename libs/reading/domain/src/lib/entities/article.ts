import { Author } from './author';
import { Id } from "@appstrophe-workspace/shared-lib";
import { Like } from './like';

export interface Article extends Id {
    title: string;
    description: string;
    imageUrl: string;
    author: Author;
    tags: string[];
    time: number;
    comments: number;
    likes: Like[];
}