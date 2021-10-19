import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Idea} from "../model/idea";

const apiUrl = environment.apiUrl + '/idea';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) {
  }

  search(params): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${apiUrl}`, {params});
  }

  get(id: number): Observable<Idea> {
    return this.http.get<Idea>(`${apiUrl}/${id}`);
  }
}
