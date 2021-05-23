import {Component, OnInit} from '@angular/core';
import {JwtService, ModalService, ReservationService, UserService} from '../../../core/services';
import {IDiscount} from '../../../core/interfaces/IDiscount';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {IUserProfile} from '../../../core/interfaces';
import {PaymentStatus} from '../../../core/enums';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: IUserProfile;

  unfilledReservations = [];

  discount: IDiscount = {
    userId: 1,
    amount: 100,
    howLongAvailableInDays: 2,
    additionalInfo: 'on bar',
    realised: false
  };

  // DOSTYLOWAĆ ADD OPINION MODALKĘ I DOKOŃCZYĆ TEN TEMAT WRESZCIE!
  // NAPISAĆ JAKĄŚ LOGIKĘ Z ZASADAMI PRZYZNAWANIA PROMOCJI ITD, OD LICZBY REZERWACJI, WYDANEJ KASY NA TERENIE HOTELU, LICZBY REZERWACJI NA RAZ, ŻE ILE OSÓB ITD...

  private _subscriptions: Subscription[] = [];

  constructor(
    private readonly _modalService: ModalService,
    private readonly _userService: UserService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _reservationService: ReservationService,
    private readonly _jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute
      .data
      .subscribe(value => this.profile = value.profile);

    this.profile
      .reservations
      .filter(value => value.paymentStatus === PaymentStatus.PAID.toString())
      .forEach(value => {
      if (value.opinionMessage === '') {
        this.unfilledReservations.push(value);
      }
    });
  }

  public openModal(id: string) {
    this._modalService.open(id);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
