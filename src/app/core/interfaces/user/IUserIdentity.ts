import { IBaseUser } from "./IBaseUser";

export interface IUserIdentity extends IBaseUser {
  token: string;
}
