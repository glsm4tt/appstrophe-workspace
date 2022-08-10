import { Author } from './author';
import { Id, IdName } from "@appstrophe-workspace/shared-lib";
import { Like } from './like';

export interface Article extends Id {
    title: string;
    description: string;
    imageUrl: string;
    author: Author;
    tags: IdName[];
    time: number;
    comments: number;
    likes: Like[];
}