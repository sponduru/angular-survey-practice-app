import { Injectable } from '@angular/core';
import {  HttpClient} from "@angular/common/http";

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  getSurveyData(){
   return this.http.get("https://api.myjson.com/bins/1c9yon");
  }

}
