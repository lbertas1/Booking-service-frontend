import {Injectable} from '@angular/core';
import {ApiService} from './ApiService';
import {JwtService} from './JwtService';
import {IOpinionRequest, IOpinionResponse, IReservationRequest, IReservationResponse} from '../interfaces';
import {Observable} from 'rxjs';
import {IOpinion} from '../interfaces/opinion/IOpinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private path = '/opinions';

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

  public saveOpinions(opinion: IOpinionRequest): Observable<IOpinionResponse> {
    return this._apiService.post(`${this.path}`, opinion);
  }
}
