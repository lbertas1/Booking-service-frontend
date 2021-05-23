import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {JwtService, NotifyService, OpinionService, UserService} from '../../../core/services';
import {IChangePassword, IOpinionRequest, IRegisterUser} from '../../../core/interfaces';
import {DatePipe} from '@angular/common';
import {Translate} from '../../../core/pipes';

@Component({
  selector: 'app-add-opinion-modal',
  templateUrl: './add-opinion-modal.component.html',
  styleUrls: ['./add-opinion-modal.component.scss'],
  providers: [DatePipe, Translate]
})
export class AddOpinionModalComponent implements OnInit {

  @Input() unfilledReservations = [];

  @ViewChild('addOpinionModal') addOpinionModal: NgxSmartModalComponent;

  private _dateFormat = 'YYYY-MM-dd';

  chosenReservations = [];

  public form: FormGroup;

  public isSubmitted = false;

  private _subscriptions: Subscription[] = [];

  private readonly _formFields = {
    opinion: ['', Validators.required],
    evaluation: ['', Validators.required]
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _notifyService: NotifyService,
    private readonly _datePipe: DatePipe,
    private readonly _opinionService: OpinionService,
    private readonly _translatePipe: Translate,
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group(this._formFields);
  }

  public get formControls() {
    return this.form.controls;
  }

  public submit(): void {
    this.isSubmitted = true;
    this.form.disable();

    if (!this.form.valid) {
      this.form.enable();
      this.isSubmitted = false;
      return;
    }
  }

  updateChosenReservations(event) {
    if (event.target.checked) {
      this.chosenReservations.push(event.target.value);
    } else {
      this.chosenReservations
        .forEach((value, index) => {
          if (value === event.target.value) {
            this.chosenReservations.splice(index, 1);
          }
        });
    }
  }

  private formatDate(someDate: Date, format: string): string {
    return this._datePipe.transform(someDate, format);
  }

  saveOpinions() {
    const opinion: IOpinionRequest = {
      reservationsId: this.chosenReservations,
      opinionDate: this.formatDate(new Date(), this._dateFormat),
      message: this.form.controls['opinion'].value,
      evaluation: this.form.controls['evaluation'].value
    };

    this._subscriptions.push(this._opinionService
      .saveOpinions(opinion)
      .subscribe(value => {
        this.addOpinionModal.close();
        this._notifyService.pushSuccess(this._translatePipe.transform('Saved'),
          this._translatePipe.transform('Your opinions have been saved correctly.'));
        window.location.reload();
      }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(value => value.unsubscribe());
  }
}
