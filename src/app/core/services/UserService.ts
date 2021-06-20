import { Injectable } from "@angular/core";
import { ApiService } from "./ApiService";
import { Observable } from "rxjs";
import {
  IChangePassword,
  ICityUsernameData,
  ICredentials,
  IUserIdentity,
  IRegisterUser,
  IUpdateUser,
  IUserProfile, IUserRequest, IAdminIdentity
} from '../interfaces';
import { IAccess } from "../interfaces";
import {Role} from '../enums';

@Injectable({
  providedIn: "root"
})
export class UserService {

  private path: string = '/users';

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

  public login(credentials: ICredentials): Observable<IUserIdentity> {
    return this._apiService.post(`${this.path}/login`, credentials);
  }

  public logout(identity: IUserIdentity): Observable<IAdminIdentity> {
    return this._apiService.post(`${this.path}/log-out`, identity);
  }

  public register(iRegisterUser: IRegisterUser): Observable<IUserRequest> {
    return this._apiService.post(`${this.path}/register`, iRegisterUser);
  }

  public profile(id: number): Observable<IUserProfile> {
    return this._apiService.get(`${ this.path }/profile/${id}`);
  }

  public save(iRegisterUser: IRegisterUser): Observable<IUserRequest> {
    return this._apiService.post(`${ this.path }/save`, iRegisterUser);
  }

  public update(iUpdateUser: IUpdateUser): Observable<IUpdateUser> {
    return this._apiService.put(`${ this.path }/update`, iUpdateUser);
  }

  public remove(id: number): Observable<number> {
    return this._apiService.delete(`${ this.path }/remove/${id}`);
  }

  public changePassword(changePassword: IChangePassword): Observable<number> {
    return this._apiService.post(`${ this.path }/change-password`, changePassword);
  }

  public changeRole(iAccess: IAccess): Observable<IUserRequest> {
    return this._apiService.post(`${ this.path }/change-role`, iAccess);
  }

  public getAvailableAdmins(): Observable<ICityUsernameData[]> {
    return this._apiService.get(`${ this.path }/take-available-admins`)
  }
}
