import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Joke } from '../models/Joke';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
   private JOKE_HREF = 'https://v2.jokeapi.dev/joke';
  constructor(private httpClient : HttpClient) { }
  getJokes( amount: number =5, category: Category = 'Any'): Observable<JokeResponse> {
    const params = new HttpParams()
    .set('amount', amount);
    const href = `${this.JOKE_HREF}/${category}`
    // const href = 'https://v2.jokeapi.dev/joke/Dark?blacklistFlags=political';
 /*    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`; */

    return this.httpClient.get<JokeResponse>(href, {params});
  }
}
interface JokeResponse {
  amount: number;
  error: boolean;
  jokes: Joke[];
}