import { AppStropher } from "../../entities/AppStropher";

export const UserServiceStub = {
  uploadProfilePicture: (file: File, user: AppStropher): Promise<void> => new Promise(resolve => resolve()),
}
  