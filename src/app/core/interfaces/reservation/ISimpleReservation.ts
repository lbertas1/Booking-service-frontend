import {PaymentStatus} from "../../enums";

export interface ISimpleReservation {
  reservationId: number;
  roomNumber: number;
  startOfBooking: string;
  endOfBooking: string;
  priceForNight: string;
  totalAmountForReservation: string;
  paymentStatus: PaymentStatus;
  opinionDate: string;
  opinionMessage: string;
  opinionEvaluation: string;
}
