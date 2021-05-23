import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtService, ModalService, NotifyService, UserService, WebSocketService} from "../../core/services";
import {Subscription} from "rxjs";
import {RxStompService} from "@stomp/ng2-stompjs";
import {ICityUsernameData, IIdentity} from "../../core/interfaces";
import {Role} from "../../core/enums";
import {SessionStorageService} from "../../core/services/SessionStorageService";
import {Translate} from '../../core/pipes';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [Translate]
})
export class ChatComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  private _identity: IIdentity;

  isChatOpened = false;

  admins: ICityUsernameData[] = [];

  constructor(
    private readonly _modalService: ModalService,
    private readonly _rxStompService: RxStompService,
    private readonly _userService: UserService,
    private readonly _notifyService: NotifyService,
    private readonly _jwtService: JwtService,
    private readonly _webSocketService: WebSocketService,
    private readonly _sessionStorageService: SessionStorageService,
    private readonly _translatePipe: Translate
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this._webSocketService.isChatOpened$.subscribe(value => this.isChatOpened = value));
  }

  public openModal(id: string) {
    this._identity = this._jwtService.getIdentity();
    if (this._identity.username !== undefined) {
      this._webSocketService.getUserUsername(this._identity.username);
    }

    if (this._identity.role === undefined || this._identity.role === Role.ROLE_USER) {
      this.subscriptions.push(this._userService.getAvailableAdmins().subscribe(value => {
        this.admins = value;
        if (this.admins.length > 0) {
          this._modalService.open(id);
          this._webSocketService.changeValueOfEnterAllowed(true);
        } else {
          this._notifyService.pushWarning(this._translatePipe.transform('No admin available'),
            this._translatePipe.transform('We are sorry, unfortunately it is impossible to contact with the staff now. Please try again later.'));
        }
      }));
    } else {
      this.isChatOpened = true;
    }
  }

  public afterClosingChat(value: boolean): void {
    this.isChatOpened = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
