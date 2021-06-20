import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {IAdminIdentity} from '../../../core/interfaces';

@Component({
  selector: 'app-hotel-report-modal',
  templateUrl: './hotel-report-modal.component.html',
  styleUrls: ['./hotel-report-modal.component.scss']
})
export class HotelReportModalComponent implements OnInit {

  @ViewChild('reportModal') reportModal: NgxSmartModalComponent;

  @Input('adminIdentity') adminIdentity: IAdminIdentity;

  constructor() { }

  ngOnInit(): void {
  }
}
