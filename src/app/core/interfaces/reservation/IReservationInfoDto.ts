import {PaymentStatus} from '../../enums';

export interface IReservationInfoDto {
  id: number;
  reservationNumber: number;
  startOfBooking: Date;
  endOfBooking: Date;
  roomNumber: number;
  paymentStatus: PaymentStatus;
  totalAmountForReservation: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
