import { Author } from './author';
import { Id } from "@appstrophe-workspace/shared-lib";

export interface Like extends Id {
    author: Author;
}