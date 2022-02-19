import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JokeLocalStorageService {
  private readonly DEFAULT_JOKE_PAGE_SIZE = 10;
  private readonly _jokePageSize$ = new BehaviorSubject<number>(
    this.DEFAULT_JOKE_PAGE_SIZE
  );
  readonly jokePageSize$ = this._jokePageSize$.asObservable();
  constructor() {
    const pageSize =
      window.localStorage.getItem('pageSize') ||
      this.DEFAULT_JOKE_PAGE_SIZE.toString();
    this._jokePageSize$.next(parseInt(pageSize));
  }
  changeJokePageSize(pageSize: number) {
    window.localStorage.setItem('pageSize', pageSize.toString());
    this._jokePageSize$.next(pageSize);
  }
}
