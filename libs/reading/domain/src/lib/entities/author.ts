import { IdName } from "@appstrophe-workspace/shared-lib";

export interface AuthorDto extends IdName {
    alias: string;
    firstname: string;
}

export interface Author extends AuthorDto {
    photoUrl: string;
}