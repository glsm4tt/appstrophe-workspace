import { IdName } from "@appstrophe-workspace/shared-lib";

export type AuthorDto = IdName;

export interface Author extends IdName {
    photoUrl: string;
}