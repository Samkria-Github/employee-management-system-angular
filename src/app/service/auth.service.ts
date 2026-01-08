import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  isAuthenticated(): boolean {
    if (
      localStorage.getItem(environment.storageKey) &&
      localStorage.getItem(environment.storageKey) !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearStorage(): void {
    localStorage.removeItem(environment.storageKey);
  }
}
