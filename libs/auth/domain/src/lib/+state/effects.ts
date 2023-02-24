import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';


@Injectable()
export class AuthEffects {

    private _actions$ = inject(Actions)
}