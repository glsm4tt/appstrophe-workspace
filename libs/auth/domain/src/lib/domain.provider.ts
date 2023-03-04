import { importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { authFeature, AuthEffects } from "./+state";

export function fromAuthDomain() {
    return [
        importProvidersFrom(
            StoreModule.forFeature(authFeature),
            EffectsModule.forFeature([AuthEffects])
        )
    ]
}