export interface AuthorDto {
    alias: string;
    id: string;
}

export interface Author extends AuthorDto {
    photoUrl: string;
}