import { Id } from '@appstrophe-workspace/shared-lib';
import { Author } from './author';
import { Timestamp } from '@angular/fire/firestore';
import { Reaction } from './reaction';

export interface Comment extends Id {
    author: Partial<Author>;
    date: Timestamp;
    text: string;
    reactions: Reaction[];
    liked: boolean;
    owned: boolean;
}