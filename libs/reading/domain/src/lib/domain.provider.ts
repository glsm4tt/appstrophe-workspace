import { importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { readingFeature, ArticleEffects } from "./+state";

export function fromReadingDomain(){
    return [
        importProvidersFrom(StoreModule.forFeature(readingFeature)),
        importProvidersFrom(EffectsModule.forFeature([ArticleEffects]))
    ]
}