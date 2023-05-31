import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class DataService {
  private actionUrl: string;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.actionUrl = "https://localhost:44388/api/";
  }

  public getAll<T>(actionURL: string, CustomerModel: any): Observable<T> {
     this.spinner.show();
    debugger
    return this.http.get<T>(this.actionUrl + actionURL + CustomerModel);
  }


  public add<T>(actionURL: string, itemToAdd: any): Observable<T> {
    return this.http.post<T>(this.actionUrl + actionURL, itemToAdd);
  }


  public delete<T>(actionURL: string, ID: number): Observable<T> {
   debugger
    return this.http.delete<T>(this.actionUrl + actionURL + ID);
  }
}
