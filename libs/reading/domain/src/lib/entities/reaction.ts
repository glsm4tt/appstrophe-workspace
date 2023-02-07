import { Author } from './author';
import { Id } from "@appstrophe-workspace/shared-lib";
import { Timestamp } from '@angular/fire/firestore';

export interface Reaction extends Id {
    date: Timestamp;
    type: 'like'
}