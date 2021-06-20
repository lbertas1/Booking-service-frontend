import { Injectable } from "@angular/core";
import { IUserIdentity } from "../interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public readonly isAuthenticated$ = new BehaviorSubject<boolean>(!!this.getIdentity());

  public getIdentity(): IUserIdentity {
    return localStorage.getItem('identity') ? JSON.parse(localStorage.getItem('identity')) : false;
  }

  public saveIdentity(identity: IUserIdentity): IUserIdentity {
    localStorage.setItem('identity', JSON.stringify(identity));
    this.isAuthenticated$.next(true);
    return identity;
  }

  public getAccessToken(): string {
    return this.getIdentity().token;
  }

  public removeIdentity(): void {
    localStorage.removeItem('identity');
    this.isAuthenticated$.next(false);
  }
}
