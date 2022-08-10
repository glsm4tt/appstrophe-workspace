import { CommentReply } from './comment-reply';

export interface Comment extends CommentReply {
    replies: CommentReply[];
}