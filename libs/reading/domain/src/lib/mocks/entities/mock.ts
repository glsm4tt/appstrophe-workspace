import { IdTokenResult, User } from '@angular/fire/auth';
import { Like } from '../../entities';
import { Article } from '../../entities/article';
import { Comment } from '../../entities/comment';

export class Mock {

    static readonly like: Like = {
        id: '1',
        author: {
            id: '1',
            name: 'Sylvain DEDIEU',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
    }

    static readonly comment: Comment = {
        id: '1',
        replies: [{
            id: '1',
            author: {
                id: '1',
                name: 'Sylvain DEDIEU',
                photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
            },
            date: new Date(),
            text: 'reply',
            likes: [1, 2, 3].map(i => ({
                id: i.toString(), name: '', author: {
                    id: '1',
                    name: 'Sylvain DEDIEU',
                    photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
                }
            }))
        }],
        author: {
            id: '1',
            name: 'Sylvain DEDIEU',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        date: new Date(),
        text: `Ceci est un texte\n sur deux niveaux.\n  avec un tab.`,
        likes: [1, 2, 3].map(i => ({
            id: i.toString(), name: '', author: {
                id: '1',
                name: 'Sylvain DEDIEU',
                photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
            }
        }))
    };

    static readonly articles: Article[] = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
        id: i.toString(),
        title: 'Design Tools',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
      deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!<br>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!`,
        time: 5,
        tags: [{ id: '1', name: 'Angular' }],
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
            id: '1',
            name: 'Sylvain DEDIEU',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        comments: 5,
        likes: []
    }));

    static readonly article: Article = {
        id: '1',
        title: 'Design Tools',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
  deserunt
  ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
  minus consequuntur!<br>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt
  ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
  minus consequuntur!`,
        time: 5,
        tags: [{ id: '1', name: 'Angular' }],
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
            id: '1',
            name: 'Sylvain DEDIEU',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        comments: 3,
        likes: [Mock.like]
    };

    static readonly user: User = {
        emailVerified: false,
        isAnonymous: false,
        metadata: undefined,
        providerData: [],
        refreshToken: '',
        tenantId: '',
        delete: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        getIdToken: function (forceRefresh?: boolean): Promise<string> {
            throw new Error('Function not implemented.');
        },
        getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
            throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        toJSON: function (): object {
            throw new Error('Function not implemented.');
        },
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        providerId: '',
        uid: ''
    }

}