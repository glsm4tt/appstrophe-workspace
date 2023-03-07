import { IdTokenResult, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ArticleDetailed, Reaction } from '../../entities';
import { Article, ArticleDto } from '../../entities/article';
import { ArticleMetadata } from '../../entities/article-metadata';
import { Comment } from '../../entities/comment';

export class Mock {

    static readonly reaction: Reaction = {
        id: '1',
        date: Timestamp.now(),
        type: 'like'
    }

    static readonly comment: Comment = {
        id: '1',
        author: {
            id: '1',
            alias: '@sdedieu',
            firstname: 'sylvain',
            name: 'dedieu',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        date: new Timestamp(1675409728, 2),
        text: `Ceci est un texte\n sur deux niveaux.\n  avec un tab.`,
        reactions: [Mock.reaction],
        liked: false,
        owned: true
    };

    static readonly articleDtoList: ArticleDto[] = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
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
        tags: ['Angular'],
        author: {
            id: '1',
            alias: '@sdedieu',
            firstname: 'sylvain',
            name: 'dedieu',
        },
        comments: 5,
        likesCount: i,
        views: 24
    }));

    static readonly articleList: Article[] = Mock.articleDtoList.map(a => ({
        ...a,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
            ...a.author,
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
    }));

    static readonly articleDto: ArticleDto = {
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
        tags: ['Angular'],
        author: {
            id: '1',
            alias: '@sdedieu',
            firstname: 'sylvain',
            name: 'dedieu',
        },
        comments: 3,
        likesCount: 2,
        views: 38
    };

    static readonly article: Article = {
        ...Mock.articleDto,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
            ...Mock.articleDto.author,
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
    };

    static readonly articleDetailed: ArticleDetailed = {
        ...Mock.article,
        articleUrl: 'fake_test_storage_url'
    };

    static readonly user: User = {
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
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