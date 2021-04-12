import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReposService {

  constructor( private http: HttpClient) { }

  postReposData(data) {
    return this.http.post('https://github-fa445-default-rtdb.europe-west1.firebasedatabase.app/repos.json', data);
  }

  getReposData() {
    return this.http.get('https://github-fa445-default-rtdb.europe-west1.firebasedatabase.app/repos.json');
  }


}
