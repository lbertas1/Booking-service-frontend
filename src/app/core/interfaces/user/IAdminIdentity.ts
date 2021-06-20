import {IUserIdentity} from './IUserIdentity';
import {IReservationInfoDto} from '../reservation/IReservationInfoDto';

export interface IAdminIdentity extends IUserIdentity{
  endingsReservations: IReservationInfoDto[];
  commencingReservations: IReservationInfoDto[];
  reservationsStartingIn3Days: IReservationInfoDto[];
  reservationsStartingIn7Days: IReservationInfoDto[];
}
