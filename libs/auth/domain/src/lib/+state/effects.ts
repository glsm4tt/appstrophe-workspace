import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { map, filter, switchMap, catchError, of, tap, delay } from 'rxjs';
import { AuthService } from '../services';
import * as AuthActions from './actions';


@Injectable()
export class AuthEffects {

    private _actions$ = inject(Actions)
    private _authService = inject(AuthService)
}