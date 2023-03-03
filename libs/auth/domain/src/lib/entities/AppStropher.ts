import { User } from "@angular/fire/auth";

export interface AppStropher extends User {
    alias?: string
}