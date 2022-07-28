import { Author } from './author';
import { IdName } from "@appstrophe-workspace/shared-lib";

export interface Article extends IdName {
    title: string;
    description: string;
    imageUrl: string;
    author: Author;
    tags: IdName[];
    time: number;
}