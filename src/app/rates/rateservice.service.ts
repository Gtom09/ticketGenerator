// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RateserviceService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatesService {

  constructor(private http: HttpClient) {}

  getRates(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.ratesUrl}/viewRates`);
  }

  updateRates(rates: any[]): Observable<void> {
    return this.http.post<void>(`${environment.ratesUrl}/updateRates`, rates);
  }
}
