import { InjectionToken } from "@angular/core";

export interface Config {
    production: boolean;
    hostUrl: string;
}

export const LIB_CONFIG = new InjectionToken<Config>('LIB_CONFIG');